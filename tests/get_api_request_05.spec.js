const {test,expect} =require('@playwright/test')
const bookingAPIRequestBody =require('../test-data/post_dynamic_request_body.json')
import { stringFormat } from '../utils/common'


test("create GET api request in playwright", async ({ request })=>{
 const dynamicRequestBOdy=stringFormat(JSON.stringify(bookingAPIRequestBody),"testers talk cypress","testers talk javascript", "apple") // change orange and  then run 

    const postAPIResponse=await request.post(`/booking`,{
        data: JSON.parse(dynamicRequestBOdy)
    })
    // Validate status code
    expect(postAPIResponse.ok()).toBeTruthy()
    expect(postAPIResponse.status()).toBe(200)
    const postAPIResponseBody =await postAPIResponse.json()
    console.log(postAPIResponseBody); 
    const bID  = postAPIResponseBody.bookingid
    // validate JSON api response

    expect(postAPIResponseBody.booking).toHaveProperty("firstname", "testers talk cypress")
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "testers talk javascript")
    // Validate nested JSON objects

    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")
    console.log("==========================")
    
    const getAPIResponse = await request.get(`/booking/${bID}`)
    console.log(await getAPIResponse.json()) 

    //validate status code
    expect(getAPIResponse.ok()).toBeTruthy()
    expect(getAPIResponse.status()).toBe(200)
    
    
})
