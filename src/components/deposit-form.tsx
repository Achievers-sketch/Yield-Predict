"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Asset, PredictionSide } from "@/lib/types";
import { ArrowDown, ArrowUp } from "lucide-react";

const depositFormSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive."),
  side: z.enum(["UP", "DOWN"]),
});

type DepositFormValues = z.infer<typeof depositFormSchema>;

type DepositFormProps = {
  asset: Asset;
};

export default function DepositForm({ asset }: DepositFormProps) {
  const { toast } = useToast();

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      side: "UP",
    },
  });

  function onSubmit(data: DepositFormValues) {
    toast({
      title: "Deposit Submitted",
      description: `Depositing ${data.amount} ${asset} for prediction ${data.side}.`,
    });
    console.log(data);
    form.reset({ amount: 0, side: data.side });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Your Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Tabs
                      defaultValue={field.value}
                      onValueChange={field.onChange as (value: string) => void}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="UP" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
                          <ArrowUp className="mr-2 h-4 w-4" />
                          UP
                        </TabsTrigger>
                        <TabsTrigger value="DOWN" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
                          <ArrowDown className="mr-2 h-4 w-4" />
                          DOWN
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ({asset})</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              style={
                {
                  "--tw-bg-opacity": 1,
                  backgroundColor:
                    form.getValues("side") === "UP"
                      ? "hsl(var(--primary))"
                      : "hsl(var(--accent))",
                } as React.CSSProperties
              }
            >
              Deposit {asset}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
