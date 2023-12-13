// import path from 'path';
import { join } from 'path';

import { createWriteStream, unlinkSync } from 'fs';
import { finished } from 'stream/promises';
import { FileUpload } from '../../modules/scalars/types/file.type';
export const uploadFile = async (
  direction: string,
  file: FileUpload,
): Promise<string | null> => {
  try {
    if (file == undefined || file == null) {
      return null;
    }
    const { createReadStream, filename, mimetype, encoding } = file;

    const filetypes = /jpeg|jpg|png|svg|pdf|docx|doc|xlsx|xls|pptx|ppt|txt|csv/;
    if (filetypes.test(mimetype.toString())) {
      const stream = createReadStream();
      const name =
        `${direction}` + Date.now() + '-' + filename.replace(/ /g, '_');
      const url = join(__dirname, `../../public/` + name);
      const out = createWriteStream(url);
      stream.pipe(out);

      await finished(out);

      return name;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
