# Frontend Assessment

An assessment based on the provided tasks, built using React, TypeScript, Webpack, Prettier, Eslint, Axios, React-Query and Material UI.  

This project is a little cheat, because you gave me an assessment almost exactly like another one I already had to complete last week, so I am able to reuse almost all my previous code.  I already integrated it with the star wars API so I'm keeping that code, and I'm also now adding the openbrewery API in order to add something new.  

## Requirements

- npm >= v10.7.0
- node >= v22.2.0

> It might work on lower versions but it's not been tested.  

OR

- Docker

## Setup

- `git clone https://github.com/xiarx/frontend.git`
- `cd frontend`

### Node

- `npm install`
- `npm run dev` (webpack dev server)

> It will listen on localhost:4000

### Docker

- `npm run docker` (requires docker to be installed)

OR

- `docker build -t digimoca . && docker run -p 8080:80 digimoca` (if you don't have node installed and just want to run the project)

> Docker will create a production build and serve it through nginx.  It will listen on localhost:8080.  

> Both webpack and docker will serve using http, if your browser is forced to https it will reject the requests.  

## Project Structure

- src - All core app components like the router goes in the root directory of src.  
- app.tsx - All context providers and app setup go there.  
- router.tsx - All app routes and navigation logic go there.  
- @context - For all context providers like theme, localization and auth.  
- @data - All API calls made to fetch data go there, as well as the response type interfaces for the expected results.  
- @api - Responsible for fetching data and client side caching, error handling and data manipulation.  Components should be able to use these hooks without needing to know where the data is coming from.  
- @hooks - For any custom hooks not relevant to the data API.  
- @components - For all UI view components including full pages, core layout, custom built components and modules/widgets.  
- @routes - All route containers go here, including page layout, navigation logic and data algorithms.  This is to keep most of the logic out of the view components and keep them as pure as possible.  
- @theme - Only global styles should go there, if it's not specific to any page or component.  

## API usage note

When deciding where to use the API hooks there are 2 big ways you can do it:

- Directly in the @components page.  
- In the @routes component and then pass the data to the @components page.  

I have set it up to be directly used in the components page because otherwise it can become a mess of interdepencies, for example:

```
const [selectedTopic, setSelectedTopic] = useState<GetTopicsResponse>();
const { loading, data } = useTopics();
const imagesResponse = useImages(
    selectedTopic ? selectedTopic.id : "4cFiN9pfkxU",
  );
```

That code is from the @components/carousel component.  If you move that topics response to the @routes/carousel component, then you would have to set the state of the child in the parent, and you'd have to let the parent update the child's state.  That design becomes really messy when the code gets bigger.  You also run into other issues where the child only does a shallow prop comparison on the response data and doesn't realize it should update state.  Alternatively only 1 value in the data changed and instead of updating only 1 component on the child it rerenders the whole child.  Eventualy the parent and child becomes completely intermingled interdependent, which you don't want.  

If the data response is really simple, you can directly use it on the child, however if you're working with much more complex algorithms and manipulation on the data, then you should put that in the @routes container and pass it to the @components child, the child should not contain a lot of algorithmic logic and data manipulation.  The @routes container can also do things like useMemo and other types of data logic if necessary.  

In this way the @components/pages are not pure view components, but everything else in @components are and should be pure views receiving props.  Before the days of hooks I used to create a @containers directory where I would put that data logic in a separate container, but using hooks it's more simple to use it directly in the @component/page.  

## Notes

- I've set up the github repo's settings to enable things like merge/rebase pushes in order to keep the commit history linear, and to force pull requests and avoid direct pushes.  
- I've enabled verified signed commits so git blame is reliable.  
- I did not realize that a repo project example was provided till after I set everything up, so every package and tool used here I set up from scratch.  
- I pushed the .env with my auth token to the repo just so other people can actually use the project without needing to set up their own dev account on unsplash, otherwise the API calls will fail.  Normally of couse you would not push that to the repo.  
- I've enabled codeql and dependabot alerts on the repo as basic static analysis tools.  If this was a real project I would have also created a github action and workflow to run the prettier and eslint checks, as well as integration with something like sonarcloud.  
- I've set up a basic docker build just so people can run the project.  I've not set up docker-compose and a development docker build yet, if other developers are going to develop on this project too I would set that up.  
- The current docker build can be used in production on an actual kubernetes / cloudrun service.  Nginx might need a little more tweaking for that and you would need to set up a CD pipeline (or just a github workflow) to inject the environment auth_token variable into the container.  
- I have not spent hours on configuring webpack, eslint and typescript, I just set up the basics so it works, on a real project I would configure the tsbuildinfo for faster builds and configure things like the codesplitting in webpack, cssminimize pugin for optimized production builds, set up things like contenthash names on the css/js files, etc.  
- The carousel page should be behind a protected route, considering that all of its API calls depends on being authenticated.  I wanted to mock that but there wasn't a good way to do it since there's no way to log in, instead I just hardcoded the login and pretend the user can see the page.  If there was a login page too I would put the carousel page behind a protected route and redirect the user if they try to visit it without being logged in.  
- I wanted to use react Suspense to load the components on the page, which I normally do.  However in this case the data being loaded already progressively updates the components without blocking any child components so there was no need to overcomplicate it.  The child components also update in real time as the data is loaded, because react is clever enough to figure out which key=index child needs to be updated directly.  I didn't see a good use case for Suspense here.  
- I could have further extended the data loading by prefetching data in the background, for example if you load the movies data table it can already start downloading each movie's characters in the background, before you ever click on view, so the data is already there when you click view and it loads instantly.  I am not preloading the data right now because the API call is so fast that it loads almost instantly so I don't see a need to unnecessarily complicate it, I would add that if we noticed the call is too slow or the page is loading too long.  
- The movies table currently does not use pagination, because I know that in the next 50 years there will never be more than 100 star wars movies.  If the data you're calling is much more, thousands of records, you would have to pull the data in parts using an index range and paginate over it showing i.e. 50 at a time.  I'm not sure how to approach this because I want to do it just to showcase my skills and thinking, but if I do that on a table that will never contain more than 100 records it feels like I'm overcomplicating something simple.  The API call also does not support querying data by index range, so I would have to pull the entire list of movies anyways.  
- I've not done extensive error handling, I only checked if there is an error and redirect the user to the error page.  I can get the `error` object and check what the message says, pass that to the @components view and display the error, but the API gives random errors that I have no control over so it's not user friendly, it would just display technical jargon on the UI that's confusing for the user, so instead I just tell them "something went wrong".  On a real application I would expect to communicate with the backend team to coordinate error status messages, so that I can properly display what went wrong to the user.  
- I have separated the styles for each component and placed it with that component in a styles.scss file, which is a strategy I enjoy using a lot.  I know a lot of people prefer using things like tailwind or other css-in-javascript strategies, but this one is my preference.  Doing styles like this allows you to very clearly organize the styles and separate them and put styles exactly where they belong.  Using an ID unique to that component also prevents styles from ever interfering with another component, no matter how big the site gets.  This strategy also allows you to know exactly where to look for any style issues, I can find any styling bugs in 30 seconds no matter how big the codebase gets.  You can now look at the UI and point to any component or page and instantly know the styles for whatever part you point to is located right next to it's jsx component.  At times when it's needed to apply logic to css, like `.active` on links for example, I use javascript to check the logic and apply a class.  This strategy also allows you to build the entire project's scss files into a big CSS, completely separating all styles from all javascript code, and allows better optimization from webpack (and caching from things like cloudflare).  That being said, if a project is using strictly tailwind or styled-components or another way of doing it, I have no problem doing it any way that's required.  
- If you're going to run a CI pipeline then all the webpack, typescript and webpack related dependencies need to be moved to dependencies, not dev-dependencies.  
- Sometimes I opted for not using material UI components like box and container, because it's easier for me to just quickly type the flex css and keep the styling out of the code.  
- I used css-variable globals to just show how I would do it, but I did not do anything extensively.  What I normally do on projects is to create a theme context provider, then to apply different css-variables to the root based on which theme is selected, i.e. "light" or "dark".  That way the theme provider swaps out the root variables, like --dark-color-text for --light-color-text, and the entire UI updates based on what's selected in the theme context.  This works a lot better than using scss variables and having to import it everywhere in code.  It also makes the entire UI update without any children ever needing to be aware of what theme is currently selected, no child ever has to do useTheme to get the theme and do any kind of logic, it's already applied globally without any children being aware of it.  All the child has to know is which variable to use, i.e. --color-text, while the provider swaps out the text color for another color.  
- A lot of people are heavily opinionated on using redux and don't particularly enjoy my view on it, which is that it is largely irrelevant and should not be used at all any more.  There was a day when redux solved some big issues on react projects, with state management and reducer logic, however since the days of context providers and hooks, along with really good client side caching libraries like react-query and apollo/client, redux should not be used any more.  For managing things like client side data, tools like apollo/client is far superior, it creates things like a flatmap data structure so that even if you query data you already called in another query, it will automatically detect that the data already exists on the client and exclude it from the next query.  It also allows you to automatically build up data structures from various data IDs that already exist in the client.  For example if you already called `users` and now you call `students`, it can automatically detect that half the users data is already on the client and only call the students IDs for the missing users it doesn't have.  Using things like apollo/client you can also create state data variables, directly linked to cache data, which triggers state changes in react components if the cache data updates (i.e. `selectedUser` that's directly mapped to a user in cache).  This kind of extensive data management is completely lost if you use something as simple as a redux store (or you have to build all of it yourself which is a massive amount of intricate work).  On redux you also shove a ton of different reducer logic into a blob which very often becomes a mess as the project scales, but if you create separate context providers for specific things, i.e. auth, localization, theme, etc), then each of them are responsible for their own reducer logic and there is clean separation of concerns.  Each of them then also only updates their own relevant subscribed children, completely separate from one another.  Using context providers along with hooks, along with a proper client side data caching library, is the way to go.  Higher ordered components also used to be a big thing in the past, but have also become irrelevant since hooks, and hooks should be used instead of HOCs.  The only reason I would continue to use redux is if a project was already using it and if it's too much code to rewrite to remove it (and even then I would vote to spend the time removing it).  
