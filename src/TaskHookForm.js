import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import { useForm } from "react-hook-form";

const formSemasi = Yup.object().shape({
  title: Yup.string()
    .required("Task başlığı yazmalısınız")
    .min(3, "Task başlığı en az 3 karakter olmalı"),
  description: Yup.string()
    .required("Task açıklaması yazmalısınız")
    .min(10, "Task açıklaması en az 10 karakter olmalı"),
  people: Yup.array()
    .max(3, "En fazla 3 kişi seçebilirsiniz")
    .min(1, "Lütfen en az bir kişi seçin"),
});

const TaskForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // yup error stateleri
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    people: "",
  });

  //const [buttonDisabled, setButtonDisabled] = useState(true);

  // form datası her güncellendiğinde valid mi diye kontrol et
  // useEffect(() => {
  //   formSemasi.isValid(formData).then((valid) => setButtonDisabled(!valid));
  // }, [formData]);

  // yup form alani her değiştiğinde çalışan kontrol fonksiyonu

  // checkboxların değişimini state içerisine eklemek için özel fonksiyon

  // diğer form alanları değiştikçe çalışan ve yeni değeri state'e ekleyen fonksiyon
};

// task ekleme
function myCustomHandleSubmit(data) {
  submitFn({
    ...formData,
    id: nanoid(5),
    status: "yapılacak",
  });
  setFormData({
    title: "",
    description: "",
    people: [],
  });
}

return (
  <form className="taskForm" onSubmit={handleSubmit(myCustomHandleSubmit)}>
    <div className="form-line">
      <label className="input-label" htmlFor="title">
        Başlık
      </label>
      <input
        className="input-text"
        id="title"
        {...register("title", { required: "Task başlığı yazmalısın" })}
        type="text"
      />
      {errors.title && <p className="input-error">{errors.title?.massage}</p>}
    </div>

    <div className="form-line">
      <label className="input-label" htmlFor="description">
        Açıklama
      </label>
      <textarea
        className="input-textarea"
        rows="3"
        id="description"
        {...register("description", {
          required: "Task açıklaması yazmalısınız",
        })}
      ></textarea>
      {errors.description && (
        <p className="input-error">{errors.description?.massage}</p>
      )}
    </div>

    <div className="form-line">
      <label className="input-label">İnsanlar</label>
      <div>
        {kisiler.map((p) => (
          <label className="input-checkbox" key={p}>
            <input type="checkbox" {...register("people")} value={p} />
            {p}
          </label>
        ))}
      </div>
      <p className="input-error">{formErrors.people}</p>
    </div>

    <div className="form-line">
      <button
        className="submit-button"
        type="submit"
        // disabled={buttonDisabled}
      >
        Kaydet
      </button>
    </div>
  </form>
);

export default TaskForm;
