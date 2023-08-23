import { FormContainer, FormInputDiv } from './styles'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCallback, useEffect, useState } from 'react'
import { api } from '../service/axios'

import InputMask from 'react-input-mask'
import { parseISO, subYears, isBefore } from 'date-fns'

const schemaFormRVP = z.object({
  fullname: z
    .string()
    .nonempty('Nome é obrigatório')
    .max(100, 'Máximo 100 caracteres'),
  documentNumber: z
    .string()
    .nonempty('O CPF é obrigatório')
    .transform((value) => value.replace(/\D/g, '')) // Remove caracteres não numéricos
    .refine((value) => value.length === 11, {
      message: 'CPF deve conter 11 dígitos numéricos',
    }),
  birthdate: z.string().refine(
    (value) => {
      const birthdayDate = parseISO(value)
      const today = new Date()
      const legalAgeDate = subYears(today, 18)

      return isBefore(birthdayDate, legalAgeDate)
    },
    {
      message: 'Você deve ser maior de idade para continuar.',
    },
  ),
  //   .string()
  //   .min(9, 'Você precisa ter mais de 18 anos para continuar...'),
  phoneNumber: z
    .string()
    .transform((value) => value.replace(/\D/g, '')) // Remove caracteres não numéricos
    .refine((value) => value.length >= 10, {
      message: 'Número de telefone deve conter pelo menos 10 dígitos numéricos',
    }),
  address: z.object({
    zipcode: z
      .string()
      .transform((value) => value.replace(/\D/g, '')) // Remove caracteres não numéricos
      .refine((value) => value.length === 8, {
        message: 'CEP deve conter 8 dígitos',
      }),
    // country: z.string(),
    // city: z.string(),
    // street: z.string(),
    // addressDistrict: z.string(),
    // addressNumber: z.string(),
    // addressComplement: z.string().optional(),
  }),

  // email: z.string().email('email inválido'),
  // minimumWage: z.number().positive(),
  // educationLevel: z.string(),
  // password: z
  //   .string()
  //   .nonempty('A senha é obrigatória')
  //   .min(10, 'A senha deve ter no mínimo 10 caracteres'),
  // confirmPassword: z.string(),
})

// .transform((data) => ({
//   ...data,
//   address: {
//     ...data.address,
//     zipcode: data.address.zipcode.replace(/\D/g, ''),
//   },
// }))

type FormPropsRVP = z.infer<typeof schemaFormRVP>

type AddressProps = {
  bairro: string
  complemento: string
  uf: string
  logradouro: string
  localidade: string
}

export function FormRPV() {
  const [output, setOutput] = useState('')

  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormPropsRVP>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaFormRVP),
    // defaultValues: {
    //   fullname: '',
    // },
  })

  const zipCode = watch('address.zipcode')

  const handleSubmitRVP = (data: FormPropsRVP) => {
    // window.alert(JSON.stringify(data, null, 2))

    setOutput(JSON.stringify(data, null, 2))
    console.log(data)

    reset()
  }

  const handleSetAddress = useCallback(
    (address: AddressProps) => {
      setValue('address.city', address.localidade)
      setValue('address.street', address.logradouro)
      setValue('address.country', address.uf)
      setValue('address.addressDistrict', address.bairro)
      setValue('address.addressComplement', address.complemento)
    },
    [setValue],
  )

  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      const { data } = await api.get(`/${zipCode}/json/`)
      handleSetAddress(data)
    },
    [handleSetAddress],
  )

  useEffect(() => {
    setValue('address.zipcode', zipCode)

    if (zipCode?.length !== 8) return

    handleFetchAddress(zipCode)
  }, [handleFetchAddress, zipCode, setValue])

  return (
    <>
      <FormContainer onSubmit={handleSubmit(handleSubmitRVP)}>
        <FormInputDiv>
          <label>Nome completo</label>
          <input type="text" {...register('fullname')} />
          <span>{errors.fullname ? errors.fullname.message : ' '}</span>
        </FormInputDiv>

        <FormInputDiv>
          <label>CPF</label>
          <InputMask mask="999.999.999-99" {...register('documentNumber')} />
          <span>
            {errors.documentNumber ? errors.documentNumber.message : ' '}
          </span>
        </FormInputDiv>

        <FormInputDiv>
          <label>Data de Nascimento</label>
          <input type="date" {...register('birthdate')} />
          <span>{errors.birthdate ? errors.birthdate.message : ' '}</span>
        </FormInputDiv>

        <FormInputDiv>
          <label>Contato</label>
          <InputMask mask="(99) 9999-9999" {...register('phoneNumber')} />
          <span>{errors.phoneNumber ? errors.phoneNumber.message : ' '}</span>
        </FormInputDiv>

        <>
          <FormInputDiv>
            <label>CEP</label>
            <InputMask mask="999-99999" {...register('address.zipcode')} />
            <span>
              {errors.address?.zipcode ? errors.address?.zipcode.message : ' '}
            </span>
          </FormInputDiv>
          {/* 

        <FormInputDiv>
          <label>Estado</label>
          <input type="text" disabled {...register('address.country')} />
          <span> </span>
        </FormInputDiv>

        <FormInputDiv>
          <label>Cidade</label>
          <input type="text" disabled {...register('address.city')} />
          <span> </span>
        </FormInputDiv>

        <FormInputDiv>
          <label>Endereço</label>
          <input type="text" disabled {...register('address.street')} />
          <span> </span>
        </FormInputDiv>

        <FormInputDiv>
          <label>Bairro</label>
          <input
            type="text"
            disabled
            {...register('address.addressDistrict')}
          />
          <span> </span>
        </FormInputDiv>

        <FormInputDiv>
          <label>Número</label>
          <input type="text" {...register('address.addressNumber')} />
          <span>
            {errors.address?.addressNumber
              ? errors.address?.addressNumber.message
              : ' '}
          </span>
        </FormInputDiv>

        <FormInputDiv>
          <label>Complemento</label>
          <input
            type="text"
            disabled
            {...register('address.addressComplement')}
          />
        </FormInputDiv> 
        */}
        </>

        {/*
      <FormInputDiv>
        <label>E-mail</label>
        <input type="email" {...register('email')} />
        <span>{errors.email ? errors.email.message : ' '}</span>
      </FormInputDiv>
      */}

        {/* <FormInputDiv>
        <label>Renda Mensal</label>
        <input
          type="number"
          // mask="999.999.999,99"
          {...register('minimumWage', { valueAsNumber: true })}
        />
        <span>{errors.minimumWage ? errors.minimumWage.message : ' '}</span>
      </FormInputDiv> */}

        {/* // educationLevel: string */}
        {/*
      <FormInputDiv>
        <label htmlFor="password">Senha</label>
        <input type="password" {...register('password')} />
        <span>{errors.password ? errors.password.message : ' '}</span>
      </FormInputDiv>

      <FormInputDiv>
        <label htmlFor="confirmPassword">Senha</label>
        <input type="password" {...register('confirmPassword')} />
        <span>
          {errors.confirmPassword ? errors.confirmPassword.message : ' '}
        </span>
      </FormInputDiv>
      */}

        <button type="submit">Cadastrar</button>
      </FormContainer>
      <pre>{output}</pre>
    </>
  )
}
