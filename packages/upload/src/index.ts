import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import multer from "multer";
import { nanoid } from "nanoid";
import prettyBytes from "pretty-bytes";

interface UploadMemoryConfig {
  storageType: "memory";
  field: string;
  mimetypes?: string[];
  fileSize: number;
}

interface UploadDiskConfig {
  storageType: "disk";
  field: string;
  mimetypes?: string[];
  fileSize: number;
  storagePath: string;
  getFilename?: (req: Express.Request, file: Express.Multer.File) => string;
}

type UploadConfig = UploadMemoryConfig | UploadDiskConfig;

const getStorageEngine = (props: UploadConfig) => {
  if (props.storageType === "memory") {
    return multer.memoryStorage();
  }

  return multer.diskStorage({
    destination: props.storagePath,
    filename: (req, file, cb) =>
      props.getFilename
        ? cb(null, props.getFilename(req, file))
        : cb(null, nanoid()),
  });
};

const upload = (props: UploadConfig) => {
  return [
    endpoint((req, res, next) => {
      const multerInstance = multer({
        limits: {
          fileSize: props.fileSize,
        },
        fileFilter: (_, file, done) => {
          if (props.mimetypes && !props.mimetypes.includes(file.mimetype)) {
            return done(
              new HttpError(
                400,
                `"${file.fieldname}" mimetype "${
                  file.mimetype
                }" must be one of [${props.mimetypes.join(", ")}]`,
              ),
            );
          }
          return done(null, true);
        },
        storage: getStorageEngine(props),
      }).single(props.field);

      multerInstance(req, res, (err: any) => {
        if (err) {
          switch (err.code) {
            case "LIMIT_UNEXPECTED_FILE":
              err = new HttpError(400, `"${err.field}" is not allowed`);
              break;

            case "LIMIT_FILE_SIZE":
              err = new HttpError(
                400,
                `"${props.field}" too large, maximum file size allowed is ${
                  props.fileSize
                } (${prettyBytes(props.fileSize)})`,
              );
              break;
          }

          next(err);

          return;
        }
        next();
      });
    }),
    endpoint((req, res, next) => {
      if (!req.file) {
        throw new HttpError(400, `"${props.field}" is required`);
      }

      next();
    }),
  ];
};

export = upload;
