# Nomine Lipsum

Pick a random name from a list of the most popular names in the United States.

## Usage

---

The generator constructs names using string interpolation.

| Flag  | Description |
| ----- | ----------- |
| `:M:` | Male name   |
| `:F:` | Female name |
| `:R:` | Random name |
| `:S:` | Surname     |

```javascript
import generator from 'nomine-lipsum';

// Random given name
generator(`:M:`); // Male   - "Michael"
generator(`:F:`); // Female - "Theresa"
generator(`:R:`); // Random - (male or female)

// Random surname
generator(`:S:`); // e.g. "Smith"

// Put 'em together for a full name
const randomName = generator(`:R: :R: :S:`);
const firstName = generator(`:F: :F: :S:`);
const firstName = generator(`:M: :M: :S:`);
```
