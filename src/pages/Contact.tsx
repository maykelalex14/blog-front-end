import React from 'react';
import Section from '../components/common/Section';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 700px;
  margin: 0 auto;
`;
const Info = styled.div`
  color: #e0b04b;
  font-size: 1.1rem;
  text-align: center;
`;
const Form = styled(motion.form)`
  background: #232526;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  padding: 32px 24px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #444;
  background: #181818;
  color: #fff;
  font-size: 1rem;
`;
const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #444;
  background: #181818;
  color: #fff;
  font-size: 1rem;
  min-height: 80px;
`;
const Button = styled(motion.button)`
  background: #b71c1c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #e0b04b;
    color: #181818;
    outline: none;
  }
`;

const Contact: React.FC = () => (
  <Section id="contact" aria-label="Contact">
    <h2 style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '2.2rem', marginBottom: 32 }}>Contact</h2>
    <ContactGrid>
      <Form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        aria-label="Contact Form"
      >
        <Input type="text" placeholder="Name" required aria-label="Name" />
        <Input type="email" placeholder="Email" required aria-label="Email" />
        <TextArea placeholder="Message" required aria-label="Message" />
        <Button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Send Message</Button>
      </Form>
    </ContactGrid>
  </Section>
);

export default Contact;
