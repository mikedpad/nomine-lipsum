# Nomine Lipsum

Pick a random name from a list of the most popular names in the United States.

## Usage

---

Just call on one of the object's methods to return a name.

| Method      | Description                  |
| ----------- | ---------------------------- |
| `full()`    | Generate a random full name  |
| `given()`   | Generate any given name      |
| `surname()` | Generate a random surname    |
| `male()`    | Generate a male given name   |
| `female()`  | Generate a female given name |
| `unisex()`  | Generate a unisex given name |

```javascript
import nomine from 'nomine-lipsum';

// Generate a random, full name
nomine.full(); // Jane Smith

// Generate given (first) names
nomine.given(); // Morgan
nomine.male(); // Michael
nomine.female(); // Theresa
nomine.unisex(); // Terry

// Generate a surname
nomine.surname(); // Smith
```

Alternatively, you can just import the method:

```javascript
import { surname } from 'nomine-lipsum';

// Generate a surname
surname(); // Williams
```

## Data Sources

All given (first) names are sourced from the United Stats Social Security Administration. More information relating to the dataset can be found on the [Background Information for Popular Names](https://www.ssa.gov/oact/babynames/background.html) page. The [National data](https://www.ssa.gov/oact/babynames/limits.html) dataset (used in this generator) is downloaded and extracted. Each year, from 1880 to 2020, has its own unique file which is analyzed for unique names and added to a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and and a Map thereafter. This ensures no duplication and a quick lookup to tally counts in creating a list of the most popular names and, in particular, unisex names (as data by US SSA has only binary genders).

Surnames are provided by the US Census Bureau. More information on dataset used can be found on the [Frequently Occurring Surnames from the 2010 Census](https://www.census.gov/topics/population/genealogy/data/2010_surnames.html) page. All of these names are all-caps and some names require minimal formatting in order to appear correct. For example, names of Gaelic origin: McDonald and O'Connor.

Please submit an issue and contribute if you find a name that is formatted incorrectly.
