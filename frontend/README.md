# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



# Demo

![raya-react-dg-dash](https://github.com/lydamian/raya-react-dg-dash/blob/main/raya-react-dg-dash.gif)

## Project Guide

### Understanding Project

#### Contents:

1. Eslint
2. Design Decisions
   1. dependencies
   2. css framework
3. Folder structure guide
4. How to trace code

#### ESLint

We are following airbnbs style guide which is arguably the most popular coding styles/conventions to follow (see link below)

https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

#### Design Decisions

#### Folder Structure Guide

```javascript
src
|---services - api calls
|---features - all reusable logic goes here.
	|--slices - redux slices for actions and reducers
|---components - reuseable utility components like buttons, etc..
|--parts - It contains a reusable components that used in the pages, like navbar or footer
|---pages - router/main logic of the app
	|---<Page/Feature Folder>
  	|---<Page/Feature>.css
		|---index.js
		|---<Page specific components>
	|... any subfolders of the above
|---assets - any public assets like images etc...
```

#### How to Trace Code

​	#todo



#### My Random Thoughts / Brainstorming

###### Building the Applicants Data Table from scratch or using a prebuilt solution?

So initially the goal of this project was to create a minimum viable product in the least amount of time. To achieve this, one of the ways I was able to generate mock data was with this awesome library called faker. I also considered using a mock API server library like mirage.js but it would be even faster with faker, plus in the future I could use both of these libraries in conjunction to mock the API as well. Well... that was off topic, I apologize. I initially wanted to use a prebuilt library solution for the table since I  didn't know how hard or easy it would be to build standard table functionalities from scratch such as pagination, search, filtering etc... I was considering using material-table since it seemed to have the most features and was most recomended by the community in 2021. However upon looking at its services I realized, that the styling was a bit opinionated and to customize it seemed like a bigger learning curve and ugliness I didnt want. It reminded my of overriding styles with material-ui in react which I did not enjoy. I think im going to go with a utility-table solution like react-table which I found super awesome. I love how easy it is to set up and how well it integrates with any design systems such as bulma, bootstrap or material ui, while still providing the standard functionality of enterprise tables. As for now I am just going to mock the UI's and put this the actual table functionality sch as filtering on the burner and maybe add in the actual functionality in the future by either implementing it from scratch or using react-table. I think my choice is going to come down to how clean the code is going to look and how easy it will to be to maintain the functionlity. I do like the idea of using a custom solution since we will have control over all the comopnents which will make any weird customizations we have in the future easier. As long as it doesn't get too complex, however on that note, doing the table from scratch seems to be pretty easy and working quite well. The structure and code looks quite simple and well modular thanks to React's componenterized ecosystem. I feel that I am able to build the UI/interactions for the table faster from scratch then to constantly refer to the documentation of any table library to build the same functionality. Since everything is in a mock stage Im finding building things from scratch quite easy, and surprising myself with possibly reusing alot of this code to build custom components in the future. Do I think I will have to refactor the tables later on to use React-Tables? Unknown. Another weird thing that I found with DG Dash on icecream is it seems like our filters are actually doing another fetch request to our endpoint to re-retrieve data. This seems weird and im curious as to why we dont provide all of the needed data for the tables on the frontend then our filters dont have to make an network request for filtering but can filter based on the provided table data locally. I might look into refactoring this way of filtering to load more tabular data on the initial request, so that subsequent filtering can be super quick.





###### Some thoughts about the repository structure

One of the main design decisions is choosing the repository structure of this react app. There are many designs one of is to basically have a folder for each entity/structure. For example one for components, one for pages, one for services, one for state. The other is to basically nest each of the required functionality into a story or page, so for example we have a loginPage, and a dashboardPage which will house all the UI, business logic, state management, and API calls within its container. So Im thinking of going with the latter and having a pages folder, where each subfolder inside pages is a page of the web application for example, login, logout, dashboard, blog etc... Inside each of these subfolders they can further recursively contain other subfolders for components each of the pages need. So each subfolder of pages will contain basically something like a 

<page-name>.jsx , <page-name>.css, and optionally <sub-page-name-folder>.

So the question becomes, where should I include reusable components that can potentially be resued in many pages. I have decided to put this in its own components folder at the same level of the pages folder. I am deciding to do the same thing with a folder called services which will house the API calls to various services we need. I am actually thinking however that mabye I can just stick this inside pages instead of creating a seperate services folder since deplication probably wont be a big deal.


I want to integrate redux as a state management system. To do this then should I create a redux folder that contains all the reducers and state management logic or should I just put the reduxSlice in its corresponding page? I kind of like the idea of putting this into the pages folder. So basically most things will live inside the pages subfolder except super-reusable utilities like shared components and utility helper functions.



###### Architecture

I have decided to follow this guide and use this react architecture!

https://saurabhshah23.medium.com/react-js-architecture-features-folder-structure-design-pattern-70b7b9103f22#e244

I really agree, and like this architecture

###### Full Path Resolution

We are able to achieve full path importants by finangling with our webpack config by following this guide: https://betterprogramming.pub/use-absolute-paths-with-react-51ced66f119f. In Webpack configuration file, add `resolve.alias` in order to create aliases in to `import` modules more easily.

###### State Management

Decided to use redux since it implements the flux pattern, although it is opinionated and has boilerplate, it also has structure and is very predictable. If I were to use something like Zustand, or Recoil.js I feel like I would have to put in the extra effort to try and create another flow similar to the flux pattern that redux has. Although I feel like redux gets alot of hate, much if it is unjustified by people not understanding that it is merely implementing a pattern hence all the reason for boilerplate, and a kit like Recoil.js isnt nearly as mature.

###### CSS framework

Decided to use bulma alongside with raisincss, which is a repository I have come to LOVEEEEE. It has about 90% of the capabilities of the popular utility css library tailwind without all the configuration, preprocessing and fuss. It is 100% a css utility library with helps boost flow ever more so. If you curious why use a css utility library please read up on tailwindui philosophy.

Anyways with this combo I believe I am able to achieve beautiful CONSISTENT styling, that is customizable to any theming opinions product or community will have in the future. Moreover, raisincss is transpired from sass and is super lightwight!

Also... BULMA IS awesome as well, super clean documentation, handles all the use cases I have for it, better internal code than bootstrap imo, and ant, bootstrap does this !important thing too much in their library which can be a pain to overrwrite. Bulma is very easy to create customizeable components.

