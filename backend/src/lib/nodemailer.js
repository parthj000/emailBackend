import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD, //App password for gmail account
  },
});

const sendMail = async (params) => {
  try {
    const { email, username, tempPassword } = params;
    console.log(params);
    const mailOptions = {
      from: {
        name: "BrainFlow",
        address: process.env.USER,
      },
      to: email,
      subject: "Welcome to BrainFlow - Let's Get Started!",
      html: `
      <div style="width: 80%; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 2px solid #ddd;">
            <h1>Welcome to BrainFlow!</h1>
        </div>
        <div style="padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
            <p>Dear ${username},</p>
            <p>Welcome to BrainFlow! We're excited to join you on your journey to academic excellence and better mental health.</p>
            <p>Your BrainFlow account is now active, giving you access to tools designed specifically for high school students like you.</p>
            <p>Log in to the app using the details below:</p>
            <p><strong>E-Mail ID:</strong>${email}</p>
            <p><strong>Password:</strong> <span style="font-size:1.5em">${tempPassword}</span> </p>
            <p><i>Note:</i> This is a temporary password; please change it when you log in.</p>
            <p>If you need help, contact our Support Team at <a href="mailto:[add support_email]" style="color: #007BFF; text-decoration: none;">[add support_email]</a>.</p>
            <p>Remember, success in school isn't just about studying harder—it's about studying smarter and taking care of your mental health. We're here to help you do both.</p>
        </div>
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; border-top: 1px solid #ddd;">
            <p>Best of luck with your studies!</p>
            <p>The BrainFlow Team</p>
        </div>
    </div>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email has been sent");
  } catch (error) {
    console.error(error);
  }
};

export { sendMail };
