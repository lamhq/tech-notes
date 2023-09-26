# Main content

To add some content into the `main` section, we can use new HTML5 tags, such as `article` and `section`.

The `article` tag is used for wrapping an **autonomous** content on a page.

> A content is autonomous if it can be removed from the page and put on some another page.

The `article` tag can contain several `section` tags inside it.

The `section` tag wraps logical groups of related content (e.g. a chapter of an article).

```html
<main>
    <article>
        <h1>JavaScript Basics</h1>
        <p>JavaScript is a rich and expressive language...</p>
        <section>
            <h2>Syntax Basics</h2>
            <p>Understanding statements, variable naming, whitespace...</p>
        </section>
        <section>
            <h2>Operators</h2>
            <p>Operators allow you to manipulate values...</p>
        </section>
        <section>
            <h2>Conditional Code</h2>
            <p>Sometimes you only want to run a block of code under certain conditions...</p>
        </section>
    </article>
</main>
```
