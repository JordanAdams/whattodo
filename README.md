WhatTodo
========

[![Build Status](https://travis-ci.org/JordanAdams/whattodo.svg?branch=master)](https://travis-ci.org/JordanAdams/whattodo)
[![Dependency Status](https://david-dm.org/jordanadams/whattodo.svg)](https://david-dm.org/jordanadams/whattodo)

Lists todo, fixme, etc. comments from files.

## Installation

    npm install -g whattodo

## Usage

Call `whattodo` from your project directory

    $ whattodo

Enjoy your list of things

```
  app/myfile.js
    19:  @fixme fix something
    100: @todo  do the thing

  app/models/user.js
    80: @todo reduce lines of code here
```

Alternatively, you can define directories/files to search

    $ whattodo myfile.js src

## Gotchas

#### Comment Formats

##### Double Slash
    // @todo do something

##### Hash
    # @todo do something

##### Double Hyphen
    -- @todo do something

##### Slash Star Block
```
/**
 *  @todo do something
 */
```

### Tag Formats
- todo
- @todo
- todo:
- @todo:

### Ignored Directories
- node_modules
- .git
- bower_components
- vendor

## License

Copyright (c) 2016, Jordan Adams

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
