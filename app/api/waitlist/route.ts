// Import the LoopsClient from the loops package
import { LoopsClient } from "loops"

// Initialize the LoopsClient with the API key from environment variables
const loops = new LoopsClient(process.env.LOOPS_API_KEY as string)

// Handle POST requests to the waitlist endpoint
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON request body
    const res = await request.json()

    // Destructure the required fields from the request body
    const { email } = res
    // Validate that email is provided
    if (!email) {
      return Response.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    // Check if a contact with the given email already exists in Loops
    const existing = await loops.findContact({ email })
    if (existing.length !== 0) {
      return Response.json({ success: false, error: "User already exists" }, { status: 409 })
    }

    // Create the contact in Loops with the provided details
    const resp = await loops.createContact({ email })

    // Respond with the success status from Loops
    return Response.json({ success: resp.success })
  } catch (error) {
    // Log any errors and return a failure response
    console.error("Error submitting to Loops:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
