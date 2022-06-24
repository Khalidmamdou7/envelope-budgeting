# Personal Budget
As simple CRUD API that allows clients to create and manage a personal budget using Envelope Budgeting principles. It allow users to manage budget envelopes and track the balance of each envelope.

# Technologies
- Node.js Express

# Features
The api supports 5 functionalities
- Creating an envelope
- Retrieving all envelopes
- Retrieving a specific envelope
- Updating an envelope details
- Deleting a specific envelope

# Usage 
1. To create an envelope, you need to send a post request to the following url ``/api/envelopes`` with a body containing a json object with the title and budget values.
  A json object example
  `` { "title": "transportation", "budget": 2000} ``
  a successful operation will yield a response conatining a json object of the new envelope with its id.
 
2. To retrieve all envelopes, you need to send a GET request to the following url ``/api/envelopes``. An array of json objects will be sent as a response.
3. To retrieve a specific envelope, you need to send a GET request to the following url ``/api/envelopes/{envelope_id}``, and the id will be replaced with the envelope's id like this for example:
``/api/envelopes/1`` which will return the envelope with the specific id if it exists.
4. To update a specific envelope, you need to send a PUT request to the following url ``/api/envelopes/{envelope_id}``, and the id will be replaced with the envelope's id like this for example:
``/api/envelopes/1`` which will update the envelope with the specific id if it exists, with the details sent in the body of the request. The body of this request should be similar to the body of the creating request.
5. To delete a specific envelope, you need to send a DELETE request to the following url ``/api/envelopes/{envelope_id}``, and the id will be replaced with the envelope's id like this for example:
``/api/envelopes/1`` which will delete the envelope with the specific id if it exists.
