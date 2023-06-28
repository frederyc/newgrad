# newgrad.eu

![Screenshot (2)](https://github.com/frederyc/newgradeu-be/assets/64581539/26118aee-1e5f-4a44-9843-050d74064151)

### Setup backend ###
Requirements:
- Java 17
- Maven 3.8.6 or higher

Setup Instructions:
1. Create a file named `application.properties` in the `be/src/main/resources` folder.
2. Inside the `application.properties` file, add the following properties: `aws.accesskey`, `aws.secretkey`, `aws.cognito.userpoolid`, `aws.cognito.clientid`, `aws.cognito.clientsecret`, `aws.dynamodb.serviceendpoint`, `aws.dynamodb.signinregion`. If you need assistance with these values, please contact the administrator. I cannot make them publicly available.
3. Open a terminal and navigate to the `/be` folder of the project.
4. Run the command `mvn clean install` to install the project dependencies.
5. Once the dependencies are installed, run the command `mvn spring-boot:run` to start the backend server.

### Setup frontend ###
Requirements:
- Node 18.14.2 or higher

Setup Instructions:
1. Create a `.env` file in the `/fe` folder. Separated by a new line, add `REACT_APP_S3_CONTAINER_COMPANIES=https://newgradeu-companies.s3.amazonaws.com` and `REACT_APP_BASE_URL=http://localhost:8080/api/v1`. The base url may differ based on the port you want to run your server on.
2. Open a terminal and navigate to the `/fe` folder of the project.
3. Run the command `npm i` to install the project dependencies.
4. After the dependencies are installed, run the command `npm start` to start the frontend application.

### Description ###
Introducing newgrad.eu, a cutting-edge web application developed as a final university project. Designed exclusively for computer science students across European universities, this innovative job board platform aims to streamline the process of finding internships or new graduate roles, while also catering to recruiters seeking talented individuals with fresh perspectives for their companies.

Unlike popular job board applications such as LinkedIn.com and Indeed.com, newgrad.eu tackles the challenge faced by students who spend countless hours searching for opportunities only to encounter numerous "junior" positions requiring 2+ years of experience. By curating job listings specifically for entry-level candidates, this platform eliminates the frustration and time wasted on unsuitable positions.

Ensuring the authenticity of its user base, newgrad.eu implements a robust authentication system. Students can only register using their university accounts, leveraging the extensive database of European university student email domains provided by the one and only ChatGPT. This means that a valid university email is required to create an account, enhancing the credibility of student profiles. Recruiters, too, must provide a company email for verification, adding an extra layer of security. By employing these stringent measures, newgrad.eu creates a trusted environment for both students and recruiters.

Empowering students with control over their job search, the platform enables them to browse, apply to, save, and report job entries that violate the website's policies, such as internships demanding excessive years of experience. Recruiters, on the other hand, possess the same capabilities while gaining the additional ability to post jobs on behalf of their companies. This inclusive approach fosters a harmonious connection between students and recruiters, facilitating meaningful opportunities for career growth.

### Tech stack ###

&emsp;• **ReactJS**
&emsp;• **Typescript**
&emsp;• **MUI components library**
&emsp;• **Java 17**
&emsp;• **Spring Boot**
&emsp;• **AWS DynamoDB**
&emsp;• **AWS Cognito**
&emsp;• **AWS S3**
&emsp;• **Spring Cache**

### Gallery ###

![Screenshot (2)](https://github.com/frederyc/newgradeu-be/assets/64581539/26118aee-1e5f-4a44-9843-050d74064151)
![Screenshot (3)](https://github.com/frederyc/newgradeu-be/assets/64581539/87aa711b-449d-45d5-9a26-222f65c8b71d)
![Screenshot (4)](https://github.com/frederyc/newgradeu-be/assets/64581539/afb3aa1a-154e-4141-abeb-eef3c93a94c6)
![Screenshot (5)](https://github.com/frederyc/newgradeu-be/assets/64581539/15fc308d-c699-4e89-a53c-485426b6eb4d)
![Screenshot (6)](https://github.com/frederyc/newgradeu-be/assets/64581539/b1e6beec-29a5-42fc-9c7d-8e0ab97cfaa0)
![Screenshot (9)](https://github.com/frederyc/newgradeu-be/assets/64581539/3a229654-98da-4193-b674-9ca1f39ae519)
![Screenshot (7)](https://github.com/frederyc/newgradeu-be/assets/64581539/8c0c6793-ba20-46f6-89d6-f369923ecd6f)
![Screenshot (10)](https://github.com/frederyc/newgradeu-be/assets/64581539/778d6645-f20d-4102-afcd-3a5a4397fe72)
![Screenshot (8)](https://github.com/frederyc/newgradeu-be/assets/64581539/f9838756-93aa-4e38-b983-c92568d9709c)
![Screenshot (11)](https://github.com/frederyc/newgradeu-be/assets/64581539/5019177f-5016-4243-86dc-91ffea7ea4d3)
