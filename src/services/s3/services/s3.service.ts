import { Endpoint } from 'aws-sdk';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
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
    const { S3_SPACE_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION } =
      process.env;
    // this.s3 = new S3Client({
    //   // The transformation for endpoint is not implemented.
    //   // Refer to UPGRADING.md on aws-sdk-js-v3 for changes needed.
    //   // Please create/upvote feature request on aws-sdk-js-codemod for endpoint.
    //   endpoint: spacesEndpoint,

    //   credentials: {
    //     accessKeyId: S3_ACCESS_KEY,
    //     secretAccessKey: S3_SECRET_KEY,
    //   },

    //   region: S3_REGION,
    // });
    this.s3 = new S3Client({
      region: S3_REGION,
      endpoint: S3_SPACE_ENDPOINT,
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
  ): Promise<string | null> {
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
        console.log('s3 service -71', fileBuffer);
        await this.uploadFileS3(name, fileBuffer);
        const url = this.getUrl(name);

        return url;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async uploadFileS3(key: string, file: Buffer) {
    const command = new PutObjectCommand({
      Bucket: process.env.DO_SPACE_NAME,
      Key: key,
      Body: file,
    });
    console.log('s3 service-91', command);
    const response = await this.s3.send(command);
    console.log('s3 service-93', response);

    return response;
  }

  async getUrl(key: string): Promise<string> {
    if (!key) {
      return null;
    }
    const expires = 24 * 60 * 60;
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    console.log('s3 service 104', command);
    const url = await getSignedUrl(this.s3, command, { expiresIn: expires }); // expires in seconds
console.log("s3 service 105",url)
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
