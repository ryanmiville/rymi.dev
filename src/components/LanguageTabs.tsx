"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const currentTab = signal("python");

export default function LanguageTabs(props: any) {
	useSignals()
	return (
    <Tabs value={currentTab.value} onValueChange={(v) => currentTab.value = v}>
      <TabsList>
        <TabsTrigger value="python">Python</TabsTrigger>
        <TabsTrigger value="scala">Scala</TabsTrigger>
      </TabsList>
      <TabsContent value="python">
				{props.python}
      </TabsContent>
      <TabsContent value="scala">
				{props.scala}
      </TabsContent>
    </Tabs>
  );
};