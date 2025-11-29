import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketCard from "@/components/market-card";
import { getMarkets } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const markets = getMarkets();
  const activeMarkets = markets.filter((m) => m.status === "active");
  const upcomingMarkets = markets.filter((m) => m.status === "upcoming");
  const settledMarkets = markets.filter((m) => m.status === "settled");
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-1");

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover z-[-1] opacity-10"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <TrendingUp className="mr-2 h-4 w-4" /> Zero-Loss Predictions
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 font-headline">
            Predict the Market.
            <br />
            <span className="text-primary">Keep Your Principal.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Enter predictions on ETH or USDT price movements. Winners share the
            yield generated from the total pool. Losers get their deposit back.
            It's a win-win.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#markets">
                Explore Markets <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">My Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="markets" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline">
            Prediction Markets
          </h2>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="settled">Settled</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
               {activeMarkets.length === 0 && <p className="text-center text-muted-foreground py-8">No active markets right now. Check back soon!</p>}
            </TabsContent>
            <TabsContent value="upcoming">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
                {upcomingMarkets.length === 0 && <p className="text-center text-muted-foreground py-8">No upcoming markets scheduled.</p>}
            </TabsContent>
            <TabsContent value="settled">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {settledMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
                {settledMarkets.length === 0 && <p className="text-center text-muted-foreground py-8">No markets have settled yet.</p>}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
