# Changelog

## v0.2.2
Bug fix: `.excluding()` did not listen for remove events on exclusion lists. If a client was removed yet still connected, it wouldn't make it into the exclusion set.<br />
Bug fix: the "add" event would fire each time you add the same client, even though it was already contained.
Feature: New `clients.pluck(Number)` method will create a new list constrained to a maximum number of clients.

## v0.2.1
The `ClientList` constructor has been exposed as `panic.ClientList`, and now accepts an array of smaller lists to pull from.

## v0.2.0
`panic.serve` has been replaced with `panic.server`, which accepts `http.Server` instances instead of options.

Breaking changes:
 - Removed `panic.serve(options)`, replacing it with `panic.server(http)`.
 - The server no longer accepts an options object.
 - The server no longer automatically listens on a port.
 - `panic.server` always returns an `http.Server`, instead of the options object.
 - `panic.js` is no longer served on the root route, only the `/panic.js` route.


## v0.1.0
First minor release.