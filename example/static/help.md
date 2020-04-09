# for-editor

this is a markdown editor

## Paragraph

*italic*

**bold**

***bold-italic***

~~delete line~~

<u>underline</u>

<kbd>keyboard text</kbd>

## Link

[demo](https://goer.icu/for-editor-herb/)

## Quote

> `for-editor` is a markdown editor

## Code

```js
const editor = require('for-editor-herb')
```

```go
import (
  "fmt"
)

func main() {
  fmt.Println("Hello World")
}
```

`const editor`

### GitHub Diff

```diff
+ add
- delete
! focus
# ignore
```

## List

- item1
  - subitem1
  - subitem2
  - subitem3
- item2
- item3

---

1. item1
2. item2
3. item3

---

- [x] item1
- [ ] item2
- [x] item3

## Table

| title      | description     |
| ---------- | --------------- |
| for-editor | markdown editor |

## Tex

Maxwell's Equations

$$
\nabla \times H = J + \frac{\partial D}{\partial t} \newline
\nabla \times E = - \frac{\partial B}{\partial t} \newline
\nabla \cdot B = 0 \newline
\nabla \cdot D = \rho
$$

Mass-energy equivalence: $E = mc^2$, Schrödinger equation: $\hat H \Psi=i \hbar \frac{\partial}{\partial t}\Psi$

## Collapse

<details>
<summary>title</summary>

content
</details>
