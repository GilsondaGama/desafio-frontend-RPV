import { FormContainer, FormInputDiv } from './styles'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCallback, useEffect } from 'react'
import { api } from '../server/axios'

import MaskedInput from 'react-text-mask'

const schemaFormRVP = z
  .object({
    fullname: z.string().min(1, 'Nome é obrigatório').max(100),
    // documentNumber: z
    //   .string()
    //   .min(11, 'CPF é obrigatório')
    //   .max(14, 'CPF inválido'),
    // birthdate: z
    //   .string()
    //   .min(9, 'Você precisa ter mais de 18 anos para continuar...'),
    phoneNumber: z.string().min(11, 'contato é obrigatório').max(15),
    address: z.object({
      zipcode: z.string(),
      // zipcode: z.string().refine((value) => value.length === 9, {
      //   message: 'CEP deve conter 8 dígitos',
      // }),
      country: z.string(),
      city: z.string(),
      street: z.string(),
      addressDistrict: z.string(),
      addressNumber: z.string().min(1).max(40),
      addressComplement: z.string().optional(),
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

  .transform((data) => ({
    ...data,
    address: {
      ...data.address,
      zipcode: data.address.zipcode.replace(/\D/g, ''),
    },
  }))

// .transform((data) => ({
//   ...data,
//   address: {
//     zipcode: data.address.zipcode,
//     country: data.address.country,
//     city: data.address.city,
//     street: data.address.street,
//     addressDistrict: data.address.addressDistrict,
//     addressNumber: data.address.addressNumber,
//     addressComplement: data.address.addressComplement,
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
    <FormContainer onSubmit={handleSubmit(handleSubmitRVP)}>
      {/* <FormInputDiv>
        <label>Nome completo</label>
        <input type="text" {...register('fullname')} />
        <span>{errors.fullname ? errors.fullname.message : ' '}</span>
      </FormInputDiv>
       */}

      {/* 
      <FormInputDiv>
        <label>CPF</label>
        <InputMask mask="999.999.999-99" {...register('documentNumber')} />
        <span>
          {errors.documentNumber ? errors.documentNumber.message : ' '}
        </span>
      </FormInputDiv>

      <FormInputDiv>
        <label>Data de Nascimento</label>
        <InputMask mask="99/99/9999" {...register('birthdate')} />
        <span>{errors.birthdate ? errors.birthdate.message : ' '}</span>
      </FormInputDiv>

      <FormInputDiv>
        <label>Contato</label>
        <InputMask mask="(99) 99999-9999" {...register('phoneNumber')} />
        <span>{errors.phoneNumber ? errors.phoneNumber.message : ' '}</span>
      </FormInputDiv> 
      */}

      <FormInputDiv>
        <label>CEP</label>
        <input
          type="text"
          // mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
          {...register('address.zipcode')}
        />
        <span>
          {errors.address?.zipcode ? errors.address?.zipcode.message : ' '}
        </span>
      </FormInputDiv>

      <FormInputDiv>
        <label>Estado</label>
        <input type="text" disabled {...register('address.country')} />
      </FormInputDiv>

      <FormInputDiv>
        <label>Cidade</label>
        <input type="text" disabled {...register('address.city')} />
      </FormInputDiv>

      <FormInputDiv>
        <label>Endereço</label>
        <input type="text" disabled {...register('address.street')} />
      </FormInputDiv>

      <FormInputDiv>
        <label>Bairro</label>
        <input type="text" disabled {...register('address.addressDistrict')} />
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
  )
}
