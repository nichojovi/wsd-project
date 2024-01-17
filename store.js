let feedbackCounts = { 1: 0, 2: 0, 3: 0, 4:0, 5:0 };

function getFeedback(feedbackValue) {
  return feedbackCounts[feedbackValue];
}

function incrementFeedback(feedbackValue) {
  feedbackCounts[feedbackValue]++;
}

export { getFeedback, incrementFeedback };
