import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Input from "./Input";

function NewsLetter() {

  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  
  const inputParam = {
    type: 'email',
    name: 'email',
    placeholder: 'email@exp.com',
    required: true,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };


  return (
    <section className="bg-accent-light" >
      <div
    className="py-8 flex flex-col lg:flex-row justify-center items-center w-11/12 mx-auto"
    >
      <h3 className="w-full lg:w-1/3 text-secondary capitalize font-bold text-2xl flex items-center justify-center pb-9 lg:p-0">
        {t("newsletter.title")}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row w-full lg:w-6/12 gap-4">
       <Input param={inputParam} onValueChange={(value) => setEmail(value)}  className="w-full lg:w-5/6"/>
        <button
          type="submit"
          className="w-full text-white bg-primary hover:text-gray-light px-6 py-4 rounded-md text-sm font-medium"
        >
          {t("newsletter.subscribe")}
        </button>
      </form>
    </div>
    </section>
    
  );
}

export default NewsLetter;
