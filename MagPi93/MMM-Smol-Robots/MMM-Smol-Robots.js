Module.register("MMM-Smol-Robots", {
  // Default module config.
  defaults: {
    feed: "https://mrpjevans.com/smol/api/latest/1",
    updateInterval: 3600 * 24,
    fadeSpeed: 4000
  },

  // Define start sequence.
  start: function() {
    Log.info("Starting module: " + this.name);

    var self = this;

    // Schedule update timer.
    setInterval(function() {
      self.updateDom(self.config.fadeSpeed);
    }, this.config.updateInterval);
  },

  // Override dom generator.
  getDom: async function() {

	Log.info("Refreshing Smol Robot");

    // Get the latest Smol Robot
    const response = await fetch(this.config.feed);
    const bots = await response.json();
    const bot = bots[0];

    // Wrap the image URL in an IMG element
    const img = document.createElement("img");
    img.src = bot.image.url;
    img.style = "filter: invert(1); width: 300px;";

    // Add title and description
    const title = document.createElement("div");
    title.innerHTML = bot.name.full;
    const description = document.createElement("small");
    description.innerHTML = bot.description;

    // Create a wrapper element and return
    const wrapper = document.createElement("div");
    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(description);
    return wrapper;
  }
});
