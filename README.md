# Nomine Lipsum

Pick a random name from a list of the most popular names in the United States.

## Usage

---

Just call on one of the object's methods to generate a type of name.

| Method      | Description                  |
| ----------- | ---------------------------- |
| `full()`    | Generate a random full name  |
| `random()`  | Generate a random given name |
| `female()`  | Generate a female given name |
| `male()`    | Generate a male given name   |
| `unisex()`  | Generate a unisex given name |
| `surname()` | Generate a random surname    |

```javascript
import nameGenerator from 'nomine-lipsum';

// Generate a full name
nameGenerator.full(); // Jane Smith

// Generate a given (first) name
nameGenerator.random(); // Morgan
nameGenerator.female(); // Theresa
nameGenerator.male(); // Michael
nameGenerator.unisex(); // Terry

// Generate a surname
nameGenerator.surname(); // Smith
```
