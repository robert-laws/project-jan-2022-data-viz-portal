# Project - January 2022 - Data Viz Portal

## Introduction

In the Spring of 2022, I am teaching students about data visualization. In an effort to help students with the learning process, I came up with the concept of a website that would provide opportunities to learn and test their knowledge about data visualization. The result of this work was the Data Viz Portal. This website has the goal of helping students discover and learn about data visualization on an attractive and interactive space.

#### The Challenge

Students enrolled in the class called Introduction to Data Visualization can find it difficult to wade through all the information that is available to them about understanding and building data visualizations. They can feel overwhelmed if there's either too much information or it's not organized in a way that is easy to understand. Students also need to test their learning, which is an important part of the learning process.

#### The Solution

The solution to this challenge is a website that combines resources with a place for students to take quizzes to test their knowledge. The resulting website would be a single location to address multiple student needs. Students can visit the website to access links to useful resources, view videos about Data Visualization, see examples of data visualizations, and take quizzes to test their knowledge. The website is also fully responsive, allowing students to view the website on a mobile device and access information from their preferred study space or when they are on the go. The website also provides students with a user account so they can track their progress taking the quizzes.

<!-- Image of website homepage -->

#### Technologies Used

The project made use of React for development of the user interface and incorporated supporting technologies such as React Router and React Google Charts. Data was stored in a Firestore database, which makes use of the Firebase service and SDK. The website also takes advantage of the Firebase authentication and hosting services. The development of the project website made use of Sass to organize and automate the styling for the website.

## Design

The design for the website focused on simplicity of layout and clarity of the content. To this end, the website only included a header, a footer, and a main content area. The design focus was placed more on content and usability. Forms used for the signup, login, quiz, and polls emphasized a clean layout and attractive UI elements. Other aspects of the design included the color palette and the typography. The color palette aimed to be modern and have a futuristic feel. The typography used only one font - [Poppins from Google Fonts](https://fonts.google.com/specimen/Poppins) - for headings and body text with the aim of creating a modern feel and maximizing readability.

<!-- Image of design options -->

The design also accounted for use on multiple screen sizes and orientations. The website design is optimized for both desktop and mobile usage. Elements such as the layout and text sizing will adjust depending on the device and screen sizing. This guarantees a good user experience no matter how a user chooses to access the website.

<!-- Image of desktop and mobile website versions -->

The website logo is also designed with minimalism in mind. The logo adopts a Google Font icon for a data dashboard. It's use is meant to imply simplicity and the arrangement of data within a dashboard space.

## Information Architecture

The website's information architecture has several top-level pages and a small number of nested page sections. At the top level are the home page, the knowledge-base page, the login, and the signup pages. Each of these pages is accessible without needing to be logged into the website. Once a user has logged in they will have access to a profile and dashboard page, which displays personalized information. They also can view and take quizzes and polls, which are sub-sections to the quiz and poll pages.

The knowledge-base page contains information that is sub-divided into four separate tab views. Users are able to select a different tab and load the content for that tab within the page. The knowledge-base page contains a range of different content including embedded videos and a data visualization from []Tableau Public](https://public.tableau.com/en-us/s/c).

## Content Development

The content for the website consists of educational-focused information. On the website, students and visitors can learn about data visualization and how to use software like Tableau to create them. Users can gain access to many different external resources as well. The website also aims to help students test their knowledge of data visualization through quizzes. Finally, students fill out poll questions each week, which are then visualized, along their their quiz results, on the dashboard page.

## Development
