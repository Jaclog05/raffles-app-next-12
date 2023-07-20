import axios from 'axios';
import crypto from "crypto";


const generateSHA1 =(data) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

const generateSignature = (publicId, apiSecret) => {
const timestamp = new Date().getTime();
return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const deleteCloud = async (publicId) => {

  const cloudName = 'dra7sow0c';
  const timestamp = new Date().getTime();
  const apiKey = '788234361516691';
  const apiSecret = 'dPBxp_DqNptV6U6zyoFmci8fM3w'
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });
    /* console.log(response); */
  } catch (error) {
    console.log(error);
  }
};

export default deleteCloud