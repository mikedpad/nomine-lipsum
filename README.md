# Nomine Lipsum

Pick a random name from a list of the most popular names in the United States.

## Usage

---

Just call on one of the object's methods to generate a type of name.

| Method  | Description |
| ----- | ----------- |
| ```full()``` | Generate a random full name   |
| ```random()``` | Generate a random given name   |
| ```female()``` | Generate a female given name   |
| ```male()``` | Generate a male given name   |
| ```unisex()``` | Generate a unisex given name   |
| ```surname()``` | Generate a random surname   |

```javascript
import generator from 'nomine-lipsum';

// Generate a full name
generator.full();       // Jane Smith

// Generate a given (first) name
generator.random();     // Morgan
generator.female();     // Theresa
generator.male();       // Michael
generator.unisex();     // Terry

// Generate a surname
generator.surname();    // Smith
```
