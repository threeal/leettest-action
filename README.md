# LeetTest Action

Compile and test solutions to [LeetCode](https://leetcode.com/) problems on GitHub Actions.

## Available Inputs

| Name    | Type             | Description                                                                        |
| ------- | ---------------- | ---------------------------------------------------------------------------------- |
| `files` | Multiple strings | A list of pattern for solution files to process. It defaults to `**/solution.cpp`. |

## Example Usages

This example demonstrates how to use this action to compile and test solutions to LeetCode problems in a GitHub Actions workflow:

```yaml
name: Test
on:
  push:
jobs:
  test-solutions:
    name: Test Solutions
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4.1.4

      - name: Test Solutions
        uses: threeal/leettest-action@v0.2.0
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2024 [Alfi Maulana](https://github.com/threeal/)
