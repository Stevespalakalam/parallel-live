
import React from 'react';

export const FAKE_USERNAMES = [
  'fruityloop77', 'jacobharper_18', 'im_cash', 'wavyydavyy', 'natur_3', 'lamslifty', 'shane_bryant',
  'mikkel_flassen', 'joenasmemes', 'lilhennywoe1', 'cornomusic', 'ryder741', 'alex_mora92', 'faze_poopstick',
  'thatguydavy', 'kyle_lynch958', 'vivianastella', 'isaachawkins4', 'oofoof_999', 'check_clapp3r', 'nolimit_az1',
  'alpha_king_my_dude', 'the_boxer_red', 'jocastone_7', 'mikes_2005'
];

export const FAKE_COMMENTS = [
  'IM YOUR BIGGEST FAN!!',
  'Hey there sexy!',
  'I hope your day is as nice as your face!',
  'Have you been working out?',
  'The force is strong with you',
  'I am lucky to be your mirror!',
  'If I could high five you... I would!',
  'You are making me blush...',
  'Just chilling, watching your live stream!',
  'Can’t wait to see your next move!',
  'Strangers all wanna sit next to you on the bus',
  'Waiting to see what you have in store for us!',
  'Your smile is contagious',
  'I bet you make babies smile',
  'You deserve a hug right now',
  'You light up the room',
  'You have a great sense of humor',
  'You’ve got all the right moves!',
  'I LOVE YOUUUUUUUUU',
  'Is it your best friend?',
  'Is it a surprise guest?',
  'Let’s get this party started!',
  'I’m here for the entertainment!',
  'Never underestimate the power of denial',
  'Greetings from Miami!',
  'Looking good today!',
  'Who is that with you??'
];

export const Icons = {
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  Camera: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
  ),
  Flip: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 3h5v5"></path><path d="M8 21H3v-5"></path><path d="M12.8 17.6a8.1 8.1 0 0 0 8.2-6.6"></path><path d="M11.2 6.4a8.1 8.1 0 0 0-8.2 6.6"></path></svg>
  ),
  Microphone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
  ),
  Heart: (props: { filled?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={props.filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 ${props.filled ? 'text-red-500' : ''}`}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
  ),
  Question: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  )
};
