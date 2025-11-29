"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getMarkets } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const marketFormSchema = z.object({
  asset: z.enum(["ETH", "USDT"]),
  predictionDateRange: z.object({
    from: z.date({ required_error: "Start date is required." }),
    to: z.date({ required_error: "End date is required." }),
  }),
});

type MarketFormValues = z.infer<typeof marketFormSchema>;

export default function AdminPage() {
  const { toast } = useToast();
  const markets = getMarkets();

  const form = useForm<MarketFormValues>({
    resolver: zodResolver(marketFormSchema),
  });

  function onSubmit(data: MarketFormValues) {
    toast({
      title: "Market Creation Submitted",
      description: `Creating ${data.asset} market from ${format(
        data.predictionDateRange.from,
        "PPP"
      )} to ${format(data.predictionDateRange.to, "PPP")}.`,
    });
    console.log(data);
    form.reset();
  }

  function onSettle(marketId: string) {
     toast({
      title: "Manual Settlement Triggered",
      description: `Attempting to settle market ${marketId}.`,
    });
    console.log(`Settling ${marketId}`);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <PageHeader title="Admin Panel" />

      <Tabs defaultValue="create" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="create">Create Market</TabsTrigger>
          <TabsTrigger value="manage">Manage Markets</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>New Prediction Market</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="asset"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asset</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an asset" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="USDT">USDT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The asset for the prediction market.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="predictionDateRange"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Prediction Window</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value?.from && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value?.from ? (
                                  field.value.to ? (
                                    <>
                                      {format(field.value.from, "LLL dd, y")}{" "}
                                      - {format(field.value.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(field.value.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span>Pick a date range</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={field.value?.from}
                              selected={{from: field.value?.from, to: field.value?.to}}
                              onSelect={field.onChange}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          The start and end date for the prediction window.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Create Market</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manage">
           <Card>
            <CardHeader>
              <CardTitle>All Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {markets.map(market => (
                    <TableRow key={market.id}>
                      <TableCell className="font-medium">{market.asset}/USD</TableCell>
                      <TableCell>
                        <Badge variant={market.status === 'active' ? 'default' : 'secondary'} className={market.status === 'active' ? 'bg-green-500/20 text-green-500 border-green-500/30' : ''}>
                          {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(market.predictionEndDate, "PPP")}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onSettle(market.id)}
                          disabled={market.status !== 'active'}
                        >
                          Settle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
