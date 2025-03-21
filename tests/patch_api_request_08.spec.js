const { test, expect } = require('@playwright/test');
const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');
const putRequestBody = require('../test-data/put_request_body.json');
const tokenRequestBody = require('../test-data/token_request_body.json');
import { stringFormat } from '../utils/common';
const patchRequestBody = require('../test-data/patch_request_body.json')

test("create PUT API request in Playwright", async ({ request }) => {
  const dynamicRequestBody = stringFormat(
    JSON.stringify(bookingAPIRequestBody),
    "testers talk cypress",
    "testers talk javascript",
    "apple"
  );

  console.log("======= POST API =======");
  const postAPIResponse = await request.post(`/booking`, {
    data: JSON.parse(dynamicRequestBody),
  });

  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  const postAPIResponseBody = await postAPIResponse.json();
  console.log(postAPIResponseBody);

  const bID = postAPIResponseBody.bookingid;

  console.log("======== GET API ========");
  const getAPIResponse = await request.get(`/booking/${bID}`);
  console.log(await getAPIResponse.json());

  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);

  console.log("======== Generate Token ========");
  const tokenResponse = await request.post(`/auth`, { data: tokenRequestBody });

  if (!tokenResponse.ok()) {
    console.error("Failed to generate token.");
    return;
  }

  const tokenAPIResponseBody = await tokenResponse.json();
  const tokenNo = tokenAPIResponseBody.token;
  console.log("Token No is:", tokenNo);

  if (!tokenNo) {
    console.error("Invalid token. Exiting...");
    return;
  }

  console.log("====== PARCH API ======");
  console.log("PUT Request Body:", JSON.stringify(putRequestBody, null, 2));

  const PatchAPIResponse = await request.patch(`/booking/${bID}`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${tokenNo}`,
    },
    data: patchRequestBody,
  });

  if (!PatchAPIResponse.ok()) {
    const errorText = await PatchAPIResponse.text();
    console.error("PUT API Error:", errorText);
    return;
  }

  const putResponseBody = await PatchAPIResponse.json();
  console.log("PUT API Response:", putResponseBody);
  //Validate status
  expect(PatchAPIResponse.status()).toBe(200)


});