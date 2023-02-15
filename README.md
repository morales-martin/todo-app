<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<h3 align="center">Chord Search</h3>

  <p align="center">
    Guitar chord search platform
    <br />
    <a href="https://github.com/morales-martin/todo-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/morales-martin/todo-app">View Demo</a>
    ·
    <a href="https://github.com/morales-martin/todo-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/morales-martin/todo-app/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project uses Next.JS and AWS Appsync to create a 'Todo' web platform, with NextAuth.js for authentication. A 'Todo' web platform provides users with a task management interface that allows for the creation, update, and deletion of tasks. Additional functions in this project include: task flags / category 'chips', task status filtering, user authentication, user-authenticated saved tasks. 

- Tasks Flags / Category 'Chips': Users are able to add custom flags or categories to tasks once created. Multiple chips can be added to a task. Individual chips can be removed from a task.
- Task Status Filtering: The task list view can be filtered by three options: "All", "Todo", and "Completed". "All" will list all tasks associated with the session / user. "Todo" will list all tasks that have not been marked as completed. "Completed" will list all tasks that have been marked as complete. Note: A task is marked as complete if its corresponding checkbox has been checked.
- User authentication: Users are able to log in using their Google account. 
- User-authenticated saved tasks / sessions: Once logged in, user sessions / tasks are saved to a database for later use.

<!--
Add Chord<br />
![Add Chord Functionality GIF](https://media.giphy.com/media/IRgicdHHjHdYZT2hjq/giphy.gif)
-->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![React.js][React.js]][React-url]
[![Next.js][Next.js]][Next-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/morales-martin/chord-search.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev 
  ```
  
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Martin Morales - morales-martin@outlook.com

Project Link: [https://github.com/morales-martin/chord-search](https://github.com/morales-martin/chord-search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/morales-martin/todo-app.svg?style=for-the-badge
[contributors-url]: https://github.com/morales-martin/todo-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/morales-martin/todo-app.svg?style=for-the-badge
[forks-url]: https://github.com/morales-martin/todo-app/network/members
[stars-shield]: https://img.shields.io/github/stars/morales-martin/todo-app.svg?style=for-the-badge
[stars-url]: https://github.com/morales-martin/todo-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/morales-martin/todo-app.svg?style=for-the-badge
[issues-url]: https://github.com/morales-martin/todo-app/issues
[license-shield]: https://img.shields.io/github/license/morales-martin/todo-app.svg?style=for-the-badge
[license-url]: https://github.com/morales-martin/todo-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/morales-martin24/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
