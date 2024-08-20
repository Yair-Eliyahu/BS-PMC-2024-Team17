
# Sami-Quizzer AI


![Logo](https://i.ibb.co/Hgdtg8H/LOGO.jpg")


Sami-Quizzer AI is a cutting-edge web application developed in Next.js 14, designed to revolutionize the way students, educators, and managers interact with educational content. The platform allows users to create quizzes from static PDF files, leveraging the power of the OpenAI API for dynamic quiz generation. Each user role—student, educator, and manager—comes with unique features tailored to their needs, enhancing the learning experience and educational management.

Key features include secure payments via Stripe, ensuring that premium services are accessed safely, and seamless authentication through Google Auth, allowing for both regular and Google-based logins. Sami-Quizzer AI is built with a focus on security, efficiency, and ease of use, providing a robust platform for educational institutions and individual learners alike.


## Features

Sami-Quizzer AI offers a comprehensive suite of features tailored to the specific needs of three distinct user roles: Students, Educators, and Institution Managers.

### Student Features

1. Quiz Generation: 
Students can upload static PDF files to generate quizzes dynamically using the OpenAI API.

2. Collaborative Learning: 
Invite other students to join the platform, fostering a collaborative learning environment.

3. Quiz Review: 
Students can review their quiz results, track their progress, and identify areas for improvement.

4. Subscription Management: Securely upgrade to a platinum subscription for additional features and benefits using Stripe.

### Educator Features
1. Advanced Quiz Generation: Educators can generate quizzes from course materials, tailored to their teaching needs.

2. Student Data Management: Review and analyze student performance data across all quizzes, enabling targeted feedback and support.

3. Collaboration Tools: Invite other educators to the platform to collaborate on quiz creation and share teaching strategies.


### Institution Manager Features

1. Comprehensive Data Access: View and manage all user data within the platform, ensuring effective oversight and administration.

2. User Management: Edit roles or delete users as necessary, maintaining the integrity and security of the platform.

3. Developer Support: Easily contact developers for technical support or feature requests via integrated email functionality.



## Installation
Create a new .env file and add your keys in the following manner:
```
OPENAI_API_KEY=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
AUTH_SECRET=""
DATABASE_URL=""
REACT_APP_SUPABASE_URL=""
REACT_APP_ANNON_KEY=""
NEXT_PUBLIC_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_WEBHOOK_LOCAL_SECRET=""
SMTP_PASSWORD=""
SMTP_EMAIL=""
GMAIL_USER=""
GMAIL_PASS=""
RECEIVER_EMAIL=""

```

Create a new .env.local file and add your keys in the following manner:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

```

Create Supabase database and connect it to the .env file


1. Install Dependencies:
Run the following command to install the main dependencies needed for your project:
```
npm install
```
2. Install Specific Packages (Optional):

If you need to install specific packages individually, you can use the following commands:
```
# Install Next.js and React
npm install next react react-dom

# Install Tailwind CSS and its plugins
npm install tailwindcss postcss autoprefixer tailwind-merge tailwindcss-animate

# Install Drizzle ORM and PostgreSQL
npm install drizzle-orm pg postgres

# Install Stripe for payments
npm install stripe @stripe/stripe-js

# Install Supabase for database management
npm install @supabase/supabase-js @supabase/ssr

# Install OpenAI for AI-based quiz generation
npm install @langchain/openai langchain

# Install Radix UI components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons \
            @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-select \
            @radix-ui/react-slot @radix-ui/react-switch

# Install other utility libraries
npm install clsx zod pdf-parse nodemailer @types/nodemailer

```

3. Set Up Tailwind CSS:

After installing the necessary packages, set up Tailwind CSS by creating the following configuration files:
```
npx tailwindcss init -p
```

4. Set Up Drizzle ORM:
Run the following command to initialize Drizzle ORM:
```
npx drizzle-kit generate:pg
```

5. Create Supabase Tables:

Connect to your Supabase project and run the migrations (if any) as defined in your project setup.

6. Run the Development Server:
Finally, run the development server:
```
npm run dev
```


## Screenshots

![App Screenshot](https://i.ibb.co/k073cCN/Greeting-Message-Screen.png)

![App Screenshot](https://i.ibb.co/SPtd2CR/Quiz-Generator.png)

![App Screenshot](https://i.ibb.co/mR1jtVh/Dashboard.png)

![App Screenshot](https://i.ibb.co/Jsx6w0j/Payment.png)

![App Screenshot](https://i.ibb.co/sCgfpxn/Students-Information.png)


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Authors

- [@MaorAtar](https://github.com/MaorAtar)
- [@GuyEzra](https://github.com/GuyEzraSCE)
- [@YairEliyahu](https://github.com/Yair-Eliyahu)
- [@LiavMaman](https://github.com/liav11maman)

