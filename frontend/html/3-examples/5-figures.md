# Figures

The `figure` tag is used to mark up photos, code blocks, diagrams, charts, illustrations, and other graphic content. 

Only images related to the content of a page should be within the `figure` tag (e.g. a logo image). Therefore, images like banner ads shouldn't be inside that tag. 

The `figcaption` tag represents a caption or legend for a figure. It's optional and can be omitted. Only one `figcaption` tag can be nested into the `figure` tag. Even if a `figure` contains multiple images, there can be only one `figcaption` for all of them.

*For instance, photos of people who liked the article could be enclosed with the `figure` tag. Since that information is not crucial to webpage functionality, it can be nested into the `aside` section of the article.*

```html
<aside>
    <p>Viewed by 1503 people</p>
    <p>Author: John Smith</p>
    <figure>
        <img src="John Doe.png" alt="John Doe"/>
        <img src="Maggie Smith.png" alt="Maggie Smith"/>
        <img src="Tom Hardy.png" alt="Tom Hardy"/>
        <figcaption>People who liked the article</figcaption>
    </figure>
</aside>
```

*The logo in the `header` section should be enclosed with the `figure` tag, as well:*

```html
<header>
    <figure>
        <img src="logo.png" alt="logo"/>
    </figure>
    <nav>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
        <a href="about.html">About Us</a>
    </nav>
</header>
```