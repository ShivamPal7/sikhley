import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, courseName } = await req.json();
    console.log("Received data:", { name, email, courseName });

    // Certifier API URL and your API key
    const apiUrl = "https://api.certifier.io/v1/credentials/create-issue-send";
    const apiKey = "cfp_CcHKXc8zWqFYNXRwrQPcB6HX5hki1EGJ0T2a";  // Replace with your actual API key

    // Get the current date in YYYY-MM-DD format (without time and timezone)
    const courseDate = new Date().toISOString().split('T')[0];  // "2024-11-29"
    console.log("Formatted issueDate:", courseDate); // Log the formatted issue date to ensure it's correct

    const requestData = {
      recipient: {
        name,
        email,
      },
      issueDate: courseDate,  // Use formatted issueDate
      expiryDate: "2025-01-01",  // Expiry date for the certificate (set as needed)
      customAttributes: {
        "custom.course_name": courseName,  // Course name as a custom attribute
      },
      groupId: "01jd4q5bbbw9qv715f4scf9r60",  // Replace with your group ID if necessary
    };

    const headers = {
      "Certifier-Version": "2022-10-26",
      "accept": "application/json",
      "authorization": `Bearer ${apiKey}`,
      "content-type": "application/json",
    };

    // Make the API call to Certifier
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestData),
    });

    // Check if response is OK
    if (!response.ok) {
      console.error("Certifier API error:", await response.text());  // Log error response from Certifier
      return NextResponse.json({ message: "Error generating certificate" }, { status: 500 });
    }

    const data = await response.json();
    console.log("Certifier response:", data);  // Log Certifier response

    // Return the publicId of the certificate
    return NextResponse.json({ publicId: data.publicId });
  } catch (error) {
    console.error("Error generating certificate:", error);  // Log any internal error
    return NextResponse.json({ message: "Failed to generate certificate", error }, { status: 500 });
  }
}
