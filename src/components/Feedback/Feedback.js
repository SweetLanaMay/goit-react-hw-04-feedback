import React, { useState, useEffect } from 'react';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import Section from 'components/Section';
import Notification from 'components/Notification';
import css from './Feedback.module.css';

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = good + neutral + bad;
    setTotal(total);
  }, [good, neutral, bad]);

  const countPositiveFeedbackPercentage = () => {
    if (total === 0) {
      return 0;
    }
    return Math.round((good / total) * 100);
  };

  const positiveFeedback = countPositiveFeedbackPercentage();
  const hasFeedback = total > 0;

  return (
    <div className={css.feedback}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onIncrementGood={() => setGood(prevGood => prevGood + 1)}
          onIncrementNeutral={() => setNeutral(prevNeutral => prevNeutral + 1)}
          onIncrementBad={() => setBad(prevBad => prevBad + 1)}
        />
      </Section>

      <Section title="Statistics">
        {hasFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positiveFeedback={positiveFeedback}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
