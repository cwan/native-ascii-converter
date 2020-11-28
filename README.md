# Native-ASCII Converter README

VS Code extension that converts characters with Unicode escapes or vice versa. The same as ['native2ascii' tool of JDK](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/native2ascii.html).

## Links

* [native-ascii-converter - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=cwan.native-ascii-converter)
* [日本語ドキュメント](README_ja.md)

## Features

* Commands (manual execution):
    + `Convert characters: Native to Ascii` - Convert all non-ASCII characters in the active text document with Unicode escapes.
    + `Convert characters: Ascii to Native` - Convert all Unicode escapes characters in the active text document with native characters.

* Options:
    + If you activate a properties file, the command "Ascii to Native" invoked automatically.
    + If you save a properties file, the command "Native to Ascii" invoked automatically.
    + You can exclude the comment lines (that start with '#') in converting "Native to Ascii".

![feature](images/feature.gif)

## Extension Settings

This extension contributes the following settings:

* `native-ascii-converter.letter-case`: Letter case in Unicode characters
    + `"Lower case"` (default)
    + `"Upper case"`
* `native-ascii-converter.comment-conversion`: Unicode conversion of the comment is carried out
    + `true`: carried out (default)
    + `false`: not carried out
* `native-ascii-converter.auto-conversion-on-save`: Convert automatically when a properties file is saved
    + `true`: effective
    + `false`: ineffective (default)
* `native-ascii-converter.auto-conversion-on-activate`: Convert automatically when a properties file is activated
    + `true`: effective
    + `false`: ineffective (default)
* `native-ascii-converter.use-files.associations`: Use "files.associations" in the settings.json for the automatic conversions
    + `true`: Use "files.associations" in the settings.json
    + `false`: Not use "files.associations". A file which name ends with only "*.properties" is converted automatically. (default)

If `native-ascii-converter.use-files.associations` is` true` and the settings.json is set as follows, the file which name matches `*.properties` or `*.properties.prod` is converted automatically.

```json
{
  "files.associations": {
    "*.properties": "properties",
    "*.properties.prod": "properties"
  }
}
```
