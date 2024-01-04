
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LanguageTabs(props: any) {
	return (
    <Tabs defaultValue="python">
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