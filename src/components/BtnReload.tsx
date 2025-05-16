
'use client'
import React from 'react'
import { Button } from './ui/button';

export default function BtnReload() {
const handleReload = () => {
  window.location.reload();
};

return (
  <div className="flex justify-center">
    <Button onClick={handleReload}>Reload</Button>
  </div>
  );
}
