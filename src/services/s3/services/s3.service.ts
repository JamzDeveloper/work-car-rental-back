import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'src/modules/scalars/types/file.type';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor() {
    const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION } = process.env;

    this.s3 = new S3Client({
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY,
      },
    });

    this.bucketName = process.env.S3_BUCKET;
  }

  async uploadFile(
    direction: string,
    file: FileUpload,
  ): Promise<ResponseUploadFile | null> {
    try {
      if (file == undefined || file == null) {
        return null;
      }
      const { createReadStream, filename, mimetype } = file;

      const stream = createReadStream();

      const fileBuffer: Buffer = await new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });

      const filetypes =
        /jpeg|jpg|png|svg|pdf|docx|doc|xlsx|xls|pptx|ppt|txt|csv/;

      if (filetypes.test(mimetype.toString())) {
        const name =
          `${direction}` + Date.now() + '-' + filename.replace(/ /g, '_');
        await this.uploadFileS3(name, fileBuffer);
        const url = await this.getUrl(name);

        return { url, key: name };
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async uploadFileS3(key: string, file: Buffer) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
    });
    const response = await this.s3.send(command);

    return response;
  }

  async getUrl(key: string): Promise<string> {
    if (!key) {
      return null;
    }
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    const url = await getSignedUrl(this.s3, command); // expires in seconds
    return url;
  }

  async deleteFile(key: string) {
    if (!key) {
      return null;
    }

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const response = await this.s3.send(command);
    return response;
  }
}
interface ResponseUploadFile {
  key: string;
  url: string;
}
