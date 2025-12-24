"use client"

import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {Card, CardContent} from "@/components/ui/card";
import TextInput from "@/components/common/input";
import {LoginResolver, LoginResolverType} from "@/app/login/types/resolver";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import AxiosClient from "@/provider/axios";
import {useState} from "react";
import Cookies from "js-cookie";

export const FormsLogin = () => {
  const [loading, setLoading] = useState(false)
  
  const form = useForm<LoginResolverType>({
    resolver: zodResolver(LoginResolver)
  })
  
  
  const HandleLogin = async (e: LoginResolverType) => {
    setLoading(true)
    await AxiosClient.post('/auth/login', e).then(res => {
      if (res.status === 200) {
        Cookies.set('token', res.data.user.token)
        setLoading(false)
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }
  
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleLogin)}>
          <Card className={'rounded-md min-w-xl'}>
            <CardContent>
              <div className="flex flex-col gap-5">
                <TextInput
                  placeholder={'Masukkan email'}
                  name={'email'}
                  form={form}
                  label={'Email'}
                  type={'email'}
                  isRow
                  isRequired
                />
                <TextInput
                  placeholder={'Masukkan password'}
                  name={'password'}
                  form={form}
                  label={'Password'}
                  type={'password'}
                  isRow
                  isRequired
                />
                <div className="flex items-center justify-between">
                  <Button className={'w-full'} disabled={loading}>
                    Login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  )
  
}