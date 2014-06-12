ps-paths-to-imagemap
====================

A Photoshop imagemap generation script

I was once trying to find an easy way of creating a complex image map that didn’t include Dreamweaver, clunky online tools, or abject frustration... and I failed.

Instead of just moaning about it on Twitter (like I would usually do), I did something about it - and the result is a handy little Photoshop script.

## Here’s what you need to do:

1. Download the PathsToImageMap.jsx script
2. Open the image that you want to map in Photoshop
3. Define each area as a path
4. Run the PathsToImageMap script
5. That’s it. The script will present you with a text file containing the map HTML.

All you need to do then is drop it in to your HTML page with the appropriate image (I’m not going to go in to detail on that here - read up on it if you don’t already know how).

## Need a little more detail?

OK...

The script will work on a single photoshop file, or all open files if you want it to.

It will generate rectangular and polygonal areas, but not circular ones (see below).

It will use the name you have given to each path to populate the href, alt and title attributes of the resulting area element.

You will need to tweak the resulting output before using it in anger, but it makes defining complex polygonal areas a lot easier.

The polygons will be defined by the path points, so you’ll need to make sure that you convert points from curves to corners to get the best results.

## So why is this useful?

OK... imagine you’ve got a map of your country of residence, visually divided in to nice blocks of colour for each state/county/region/whatever, and let’s also imagine that those regions weren’t defined by a cartographer with a ruler (so they’ve got wiggly edges).

1. Select the “magic wand” tool
2. Use it to select a specific region
3. Click on the “Make work path from selection” button in the paths palette
4. Give the work path a name
5. Repeat the above until you’ve got all of your areas defined as named paths
6. Run the script

Isn’t that easier than clicking a ton of polygonal reference points?

## Some of the polygons are a bit clunky though...

So neaten the paths up in Photoshop before you run the script.

What do you want from me? Blood? ;-)

As mentioned above, the polygons will be defined by the path points so you should convert points from curves to corners to get the best results - it’s a bit more work, but it’s still easier than defining the entire polygon point by point with a million mouse clicks…

## Here’s what it won’t do:

It doesn’t do circular areas (at the moment) - if you define a circular selection and convert it to a path you’ll end up with a polygonal area until I can work out some more complicated Photoshop scripting voodoo.

It doesn’t create the <img> element or the associated usemap attribute

## Here’s the kind of code it will output:

    <map name="imageMap"> <area shape="poly" coords="233,36,244,37,241,53,214,79,207,80,219,82,219,83,216,88,202,92,202,94,203,94,213,90,202,99,202,100,231,88,278,94,280,102,257,151,234,163,249,158,253,166,253,167,217,169,218,164,202,160,207,156,194,154,193,153,199,129,194,123,169,123,164,115,169,110,172,113,163,108,167,102,160,104,159,97,161,93,170,95,162,86,165,86,167,85,162,77,165,77,168,83,169,81,167,75,168,75,179,78,176,75,184,80,173,65,179,65,179,64,176,57,188,58,183,53,182,50,186,50,184,43,190,37,197,41,194,46,199,40,204,41,203,45,235,40,235,39,170,102,168,106,172,102" href="***Example polygonal area***.html" alt="Example polygonal area" title="Example polygonal area"/> <area shape="rect" coords="322,40,522,40,522,224,322,224" href="***Example rectangular area***.html" alt="Example rectangular area" title="Example rectangular area"/> </map>

## OK. That’s pretty handy. How to I install that script so Photoshop always has it to hand in the “Scripts” menu?

After downloading the script you will need to copy it into your Scripts folder.

On a PC, the path would be something like:

    C:\Program Files\Adobe\Photoshop (CS or CS2 or whatever version you've got)\Presets\Scripts\

On a MAC the path would be something like:

    Applications> Photoshop (CS or CS2 or whatever version you've got)> Presets> Scripts.

After copying a script to this folder you’ll need to Quit and then Restart Photoshop before the script appears in the File > Scripts menu.

## Anything else?…

Nope, that’s it. I hope you find the script useful.

It’s licensed under the Creative Commons Attribution 2.5 License so you can use it, expand on it, and generally marvel at it (as long as you publicly acknowledge my brilliance)
