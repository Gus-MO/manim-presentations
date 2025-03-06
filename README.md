# Manim-Presentations

A way to use manim on slide presentation

## How to Use

1. Install the dependencies and run the local server:

```bash
npm install
.\node_modules\.bin\http-server
```

2. Acess the project:

Example:
```
http://localhost:8000
```

## Creating your own slides

On `manim-presentations` we use a system of markers, located on `.../manim-presentations/markers.json`. Each marker should corresponds to a animation from a manim produced scene.

So, in the example, we have a video of 4 seconds, with 4 corresponding animations, 1 for each second. In the markers file, you will find a list of seconds corresponding to each animationg:

```
"markers": [
        0,
        1,
        2,
        3,
        4
]
```

So, the first animation goes from 0 to 1 second, the second from 1 to 2, and so on. This way you should map the scene animations on the markers file, and put your video on the videos folder, with the name `video1.webm`. Running the project you will be able to run the video as a slide show.

## Progress

We already have a running project, but it is still being improved for longer continuity.