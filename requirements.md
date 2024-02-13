# Software Requirements

## Vision
Our application aims to ease a significant challenge encountered during the job application process: the laborious process of crafting a tailored cover letter. What sets us apart from conventional AI-generated cover letters is our ability to not only incorporate the job description and a cover letter template but also integrate a sample of the user's own writing style, such as a previous resume or cover letter. This ensures that the generated cover letter retains the user's voice and reflects their unique writing style, resulting in a more authentic representation compared to typical AI-generated content.

## Scope (In/Out)

### IN
- The application will create cover letters.
- The application will make API requests to ChatGPT.

### OUT
- The application will not create resumes. 
- The application will not make API requests to other LLMs or generative AI tools. 
- Our web application will not be turned into a mobile application. 

### MVP
1. The generated cover letter will be tailored to a given job description.
2. A user can generate a cover letter using the default prompt or a custom one.
3. A user can add, remove, edit, save their cover letters.
4. A user can add or remove resumes.

### Stretch
1. The application will scrape the job description automatically given the url.
2. Ability to download the cover letter as a pdf (.pdf) or word (.doc) document.
3. Ability to search for past cover letters.
4. A built-in typo checker.
5. Write automated UI testing using the Playwright library. 
6. The generated cover letter will reflect the user's personal writing style.

## Functional Requirements

### 1. Manage User Profiles
&nbsp; 1.1 A user can change their username. \
&nbsp; 1.2 A user can update their email. \
&nbsp; 1.3 A user can change their password. \
&nbsp; 1.4 An admin user can add and remove users.

### 2. Create Cover Letters
&nbsp; 2.1 A user can generate a new cover letter using a default or custom prompt. \
&nbsp; 2.2 A user can generate a new cover letter using a generic or specific job description. \
&nbsp; 2.3 A user can generate a new cover letter using a generic or specific cover letter template. \
&nbsp; 2.4 A user can generate a new cover letter using a their resume as a template.

### 3. Edit Cover Letters
&nbsp; 3.1 A user can immediately edit the newly generated cover letter. \
&nbsp; 3.2 A user can edit a previously saved cover letter. 

### 4. Save and Delete Cover Letters
&nbsp; 4.1 A user can save a cover letter at any time after creation. \
&nbsp; 4.2 A user can delete an existing cover letter at any time.

### 5. Save and Delete Resumes
&nbsp; 5.1 A user can save a resume. \
&nbsp; 5.2 A user can delete a resume.

## Non-Functional Requirements

### 1. Operational Requirements
&nbsp; 1.1. The application will be containerized and can operate in any environment. \
&nbsp; 1.2. The application will be deployed to the cloud. \
&nbsp; 1.3. The application logic will sit on the frontend. \
&nbsp; 1.4. The frontend will send requests to the backend server. \
&nbsp; 1.5. The backend server will make API requests. \
&nbsp; 1.6. The backend server will make changes to the databases.

### 2. Testing Requirements
&nbsp; 2.1. The application will contain unit tests that can measure testing coverage. \
&nbsp; 2.2. The application will contain units that check for valid inputs and outputs. 

### 3. Security Requirements
&nbsp; 3.1. A user can only access and change their individual content.


