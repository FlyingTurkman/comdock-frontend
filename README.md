# COMDOCK frontend

COMDOCK is a web application that allows you to view simulated **fake** company informations, similar to what you would find in applications such as [NorthData](http://www.northdata.de) or the German Websites [unternehmensregister.de](http://www.unternehmensregister.de) and [handelsregister.de](http://www.handelsregister.de) for real informations.

## What you can do with this App

The app visualizes information about companies that could be published in the [German Company Register](https://www.unternehmensregister.de/) or the German [DPMAregister](https://register.dpma.de/).The app collects and processes this data and then presents it in an easy-to-understand format.

## DISCLAIMER

The resulting web application and its contents of this repository are in many parts very similar to the official websites and entries of the german company register. It is expressly pointed out that all contents of this website in live state and into this repository are entirely fictitious. Any similarities in company names or connections to real existing persons and companies are purely coincidental and do not correspond to reality.

The containing data of the website should be inserted exclusively through an external database. If you still find data into the code of this repository that does not seem to serve the basic structure of the website, please report by an [issue](https://github.com/onissen/comdock-frontend/issues) into this repository. Even if you find parts of the code that do not seem to be intended for the public despite our previous review (such as access data or other backdoors), please [report](https://github.com/onissen/comdock-frontend/issues) them as an issue to the repository owner. Thank you!

## Technical Informations

This project is powered by [Next.js](http://nextjs.org/). It consumes and visualizes data from a [Strapi Project](http://strapi.io) stored in [onissen/comdock-backend](http://github.com/onissen/comdock-backend).

This App uses these libraries in particular:

- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [FontAwesome Icons](https://fontawesome.com/)

All libraries used can be found in the `package.json` of this repo.

### Install and run this project

To run this Project you also need to use [onissen/comdock-backend](https://github.com/onissen/comdock-backend/). More info on running the Backend can be found in this project.

To connect this frontend to the backend you need to create an `.env` File in the project root that contains the `NEXT_PUBLIC_STRAPI_URL`:

```bash
NEXT_PUBLIC_STRAPI_URL = <your backend URL>
```

To install and run the project in development configuration, run the commands in your command line:

```bash
npm install
npm run dev
```

After it, navigate to [localhost:3000](localhost:3000) with your Browser to see the App.

## More Infos

- [Next.js Documentation](https://nextjs.org/docs/)
- I've learned Next.js and Strapi Development with the official YouTube series [Create your "next" app using Next.js and Strapi](https://youtube.com/playlist?list=PL7Q0DQYATmvjXSuHfB8CY_n_oUeqZzauZ) by Strapi.
