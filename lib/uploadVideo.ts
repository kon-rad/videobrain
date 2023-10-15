import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const uploadData = async () => {
  const API_URL = process.env.API_URL
  if (typeof API_URL === 'undefined') {
    console.log('API_URL is not defined.')
    process.exit(1)
  }
  
  const API_KEY = process.env.API_KEY
  if (typeof API_KEY === 'undefined') {
    console.log('API_KEY is not defined.')
    process.exit(1)
  }
  
  // This code assumes that you've already created an index and the unique identifier of your index is stored in a variable named `INDEX_ID`
  const INDEX_ID = '<YOUR_INDEX_ID>'

  const TASKS_URL = `${API_URL}/tasks`
  
  const filePath = '<FILE_PATH>' // Example: "/Downloads/test.mp4"
  const fileStream = fs.createReadStream(filePath)

  const formData = new FormData()
  formData.append('index_id', INDEX_ID)
  formData.append('language', 'en')
  formData.append('video_file', fileStream)

  const createResp = await axios.post(
    TASKS_URL,
    formData,
    {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": API_KEY
        }
    }
  )
  const { data: createResponse } = createResp;
  const TASK_ID = createResponse._id;
  console.log(`Status code: ${createResp.status}`)
  console.log(createResponse)

  const TASK_STATUS_URL = `${API_URL}/tasks/${TASK_ID}`
  const uploadResp = await new Promise((res) => {
    const interval = setInterval(async () => {
        const { data: response } = await axios.get(
              TASK_STATUS_URL,
              {
                  headers: {
                      "x-api-key": API_KEY
                  }
              }
          );
          if (response.status == 'ready') {
            clearInterval(interval)
              res(response)
          }
      }, 1000)
  });
  const VIDEO_ID = uploadResp.video_id
  console.log(`VIDEO_ID: ${VIDEO_ID}`)
  console.log(`Status code: ${uploadResp.status}`)
  console.log(uploadResp)
}

export default uploadData;

