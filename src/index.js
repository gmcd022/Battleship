function test() {
  var bar = "bar";
  if (bar == "bar") {
    // eslint-disable-next-line no-undef
    console.log("Hello world!");
  }
}
test()