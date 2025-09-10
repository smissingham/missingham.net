---
created: 2025-09-09T14:58
updated: 2025-09-09T15:00
---
# Rust Fundamentals: Traits, Structs, Ownership & Iterators
## Core Concepts
### Structs vs Traits
- **Struct** = Data holder (like a class) - can be instantiated
- **Trait** = Behaviour contract (like an interface) - cannot be instantiated
- Structs hold data, traits define what you can do with data
### Implementation Blocks (`impl`)
- **`impl StructName`** = Inherent methods (struct's own behavior)
- **`impl TraitName for StructName`** = Trait implementation (adding behavior contract)
- Multiple `impl` blocks allowed per struct

```rust
struct Player { name: String, score: i32 }

impl Player { fn new() -> Self { } }           // inherent methods
impl Display for Player { fn fmt() { } }       // trait implementation
```
## Ownership & Borrowing
### References & Dereferencing
- **`&x`** = Borrow (create reference, doesn't own data)
- **`*x`** = Dereference (extract value from reference)
- References are just memory addresses, not data containers
### Iterator Borrowing
- `.iter()` = borrows (`&T`)
- `.into_iter()` = takes ownership (`T`)
- `.iter_mut()` = mutable borrows (`&mut T`)
## Iterators
### Functional Patterns
- **Lazy by default** - nothing happens until consuming method called
- **Consuming methods**: `collect()`, `reduce()`, `for_each()`, `find()`
- **Transforming methods**: `map()`, `filter()`, `enumerate()`
### Data Collection Patterns
- **Tuples**: `(String, i32)` - good for 2-3 simple fields like `(make, year)`
- **Tuple structs**: `struct Position(f64, f64)` - named tuples for coordinates
- **Regular structs**: `struct Car { make: String, year: i32 }` - best for complex data
- **`#[derive(Debug, Clone)]`** - auto-implement common traits
## Error Handling
### Core Types
- **`Result<T, E>`** = Success (`Ok(T)`) or Error (`Err(E)`)
- **`Option<T>`** = Has value (`Some(T)`) or no value (`None`)
### Handling Patterns
- **`unwrap()`** = Extract value or panic (runtime crash) - avoid in production
- **`?` operator** = Propagate errors early return - standard for production
- **`match`** = Explicit pattern matching for all cases
- **`unwrap_or()`** = Provide default value if error/none

```rust
fn might_fail() -> Result<i32, String> {
    let value = some_operation()?;  // early return if error
    Ok(value + 1)
}
```