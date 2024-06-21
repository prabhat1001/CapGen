# CapGen ☘️

![Screenshot_21-6-2024_124850_localhost](https://github.com/prabhat1001/CapGen/assets/71027441/c601c778-83b5-41dd-b183-84f7ced3669e)

## Overview

CapGen is a web application that enables users to add captions to YouTube videos. Users can input YouTube video URLs, add captions with specific timestamps, and view the video with the captions overlaid.

## Live Link: https://cap-gen.vercel.app/ 

## Features

- **Video URL Input**: Users can input YouTube video URLs to load videos.
- **Caption Management**: Users can add, edit, and delete captions along with their timestamps.
- **Video Playback with Captions**: Videos are played with the custom captions overlaid.

## Technical Decisions

### Technology Stack

- **React**: Chosen for its component-based architecture, making the UI scalable and maintainable.
- **CSS**: Styling was separated into a dedicated CSS file to maintain a clean separation of concerns.

### Key Components

1. **Video Input and Loading**:
   - Implemented using a controlled input field in React for the YouTube video URL.
   
2. **Caption Management**:
   - Captions and their timestamps are managed in the component state.
   - Added functionality to dynamically add and edit captions.

3. **Caption Overlay**:
   - Custom overlay for captions was implemented to display text over the video based on the current playback time.
   - Used state and effect hooks to sync caption display with video playback.

### User Experience Considerations

- **Ease of Use**: Designed the UI to be intuitive with clear input fields and buttons for managing captions.
- **Real-time Feedback**: Captions update in real-time as the video plays, providing immediate visual feedback to the user.

### Potential Improvements

1. **Enhanced Caption Editing**:
   - Allow users to drag and drop captions on a timeline for more precise editing.
   - Add features for bulk editing and importing/exporting caption files (e.g., WebVTT, SRT).

2. **User Authentication and Storage**:
   - Implement user authentication to save and manage caption projects across sessions.
   - Use cloud storage to persist user data and captions.

3. **Advanced Video Controls**:
   - Provide more advanced video playback controls (e.g., variable playback speed, skipping).
   - Integrate with YouTube's API for more seamless interaction with video data.

4. **Accessibility Features**:
   - Add support for multiple languages and localization.
   - Enhance accessibility with keyboard navigation and screen reader support.

5. **Performance Optimization**:
   - Optimize performance for loading and playing high-resolution videos.
   - Implement lazy loading for videos and captions to improve initial load times.

With CapGen, enhancing your YouTube videos with custom captions has never been easier. We look forward to your feedback and contributions to make CapGen even better!




