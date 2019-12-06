import React from 'react';
import { Button, Form } from "react-bootstrap";

export const Label = ({ label, name, required = false, className = "form-control-label" }) => (
    <label htmlFor={label} className={className}>{name}:{required && <span className="text-danger">*</span>}</label>
)

export const CustomForm = ({ className, label, type, placeholder, minLength, name, onChange, value, required = true, id, equalTo, maxLength, min, max, onKeyUp }) => (
    <Form.Group>
        {
            label && <Form.Label>{label}: {required && <span className="text-danger">*</span>}</Form.Label>
        }
        <Form.Control onKeyUp={onKeyUp} className={className} id={id} type={type} placeholder={placeholder} required={required} minLength={minLength} onChange={onChange} name={name} value={value} data-parsley-equalto={equalTo} maxLength={maxLength} min={min} max={max} />
    </Form.Group>
)

export const CustomTextArea = ({ formRef, className, label, rows = "3", placeholder, minLength, name, onChange, value, required = true }) => (
    <Form.Group>
        {
            label &&
            <Form.Label>{label}:  {required && <span className="text-danger">*</span>}</Form.Label>
        }
        <Form.Control ref={formRef} className={className} as="textarea" rows={rows} placeholder={placeholder} required={required} minLength={minLength} name={name} onChange={onChange} value={value} />
    </Form.Group>
)

export const CustomButton = ({ block = false, variant, title, icon, loading = false, onClick, disabled = false, className, iconRight = false, type, show = true, size, showLoadingText = true }) => (
    <Form.Group>
        {
            show &&
            <Button size={size} variant={variant} type={type} block={block} disabled={loading ? true : (disabled ? disabled : false)} onClick={onClick} className={`${className} shadow-sm`}>
                {
                    icon && !iconRight && <i className={`fas fa-fw fa-${loading ? 'spinner fa-spin' : icon}`}></i>
                }
                {loading && showLoadingText ? ' Loading' : ` ${title}`}
                {
                    icon && iconRight && <i className={`fas fa-fw fa-${loading ? 'spinner fa-spin' : icon}`}></i>
                }
            </Button>
        }
    </Form.Group>
)

export const CustomSelect = ({ label, placeholder, name, onChange, value, options, required = true, useLabel = false, withOthers = false }) => (
    <Form.Group>
        {
            label && <Form.Label>{label}:  {required && <span className="text-danger">*</span>}</Form.Label>
        }
        <Form.Control as="select" onChange={onChange} value={value} name={name} required={required}>
            <option value="">{placeholder}</option>
            {
                options.map((option, index) => (
                    <option value={useLabel ? option : option.value} key={index} className="text-capitalize">{useLabel ? option : option.label}</option>
                ))
            }
            {
                withOthers && <option value="others">Others</option>
            }
        </Form.Control>
    </Form.Group>
)